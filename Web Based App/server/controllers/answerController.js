// /controllers/answerController.js
const { ChatOpenAI } = require("@langchain/openai");
const { RunnableSequence, RunnablePassthrough } = require("@langchain/core/runnables");
const {
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate,
  } = require("@langchain/core/prompts");
  const { StringOutputParser } = require("@langchain/core/output_parsers");
const { ensureVectorStore } = require('../utils/vectorStoreUtils');
const { createClient } = require('@supabase/supabase-js');

async function getConversationChain(vectorStore, query) {
    const model = new ChatOpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const SYSTEM_TEMPLATE = `...`; // Long system template
    const messages = [
        SystemMessagePromptTemplate.fromTemplate(SYSTEM_TEMPLATE),
        HumanMessagePromptTemplate.fromTemplate("{question}")
    ];
    const prompt = ChatPromptTemplate.fromMessages(messages);

    const chain = RunnableSequence.from([
        { context: vectorStore.asRetriever().pipe(formatDocumentsAsString), question: new RunnablePassthrough() },
        prompt,
        model,
        new StringOutputParser(),
    ]);

    const answer = await chain.invoke(query);
    return answer;
}

async function getAnswer(req, res) {
    const { query } = req.body;
    const client = createClient(process.env.SUPABASE_URL_LC_CHATBOT, process.env.SUPABASE_API_KEY);
    const vectorStore = await ensureVectorStore(client, [], process.env.OPENAI_API_KEY, true);
    const conversation = await getConversationChain(vectorStore, query);

    res.json({ message: 'Answer Found Successfully', answer: conversation });
}

module.exports = {
    getConversationChain,
    getAnswer
};
