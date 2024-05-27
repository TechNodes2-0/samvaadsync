// /controllers/documentController.js
const { createClient } = require('@supabase/supabase-js');
const { getChunkedDocsFromPDF } = require('../utils/pdfLoader');
const { ensureVectorStore } = require('../utils/vectorStoreUtils');
const { getConversationChain } = require('./answerController'); // Importing function from another controller

async function uploadDocument(req, res) {
    const PDFdocs = req.files.PDFdocs;
    const output = await getChunkedDocsFromPDF(PDFdocs.path);
    const client = createClient(process.env.SUPABASE_URL_LC_CHATBOT, process.env.SUPABASE_API_KEY);
    const vectorStore = await ensureVectorStore(client, output, process.env.OPENAI_API_KEY, false);

    const questionText = `...`; // Long question text
    const conversation = await getConversationChain(vectorStore, questionText);

    res.json({ message: 'Files uploaded successfully', question: conversation });
}

module.exports = {
    uploadDocument
};
