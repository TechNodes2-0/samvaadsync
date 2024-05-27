// /util/vectorStoreUtils.js
const {OpenAIEmbeddings} = require('langchain/embeddings/openai');
const { SupabaseVectorStore } = require('langchain/vectorstores/supabase');

async function ensureVectorStore(client, documents, openAIApiKey, alreadyProcessed) {
    let vectorStore;
    if (alreadyProcessed) {
        vectorStore = await SupabaseVectorStore.fromExistingIndex(new OpenAIEmbeddings({ openAIApiKey }), {
            client,
            tableName: 'pdfdocuments',
            queryName: 'match_pdfdocuments',
        });
    } else {
        vectorStore = await SupabaseVectorStore.fromDocuments(
            documents,
            new OpenAIEmbeddings({ openAIApiKey }),
            { client, tableName: 'pdfdocuments', queryName: 'match_pdfdocuments' }
        );
    }
    return vectorStore;
}

module.exports = {
    ensureVectorStore
};
