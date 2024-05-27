// /routes/documentRoutes.js
const express = require('express');
const router = express.Router();
const { uploadDocument } = require('../controllers/documentController');
const formidable = require('express-formidable');

router.post('/upload', formidable({ multiples: true }), uploadDocument);

module.exports = router;
