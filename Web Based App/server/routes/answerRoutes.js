// /routes/answerRoutes.js
const express = require('express');
const router = express.Router();
const { getAnswer } = require('../controllers/answerController');

router.post('/getAnswer', getAnswer);

module.exports = router;
