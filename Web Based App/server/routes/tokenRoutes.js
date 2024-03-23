const express = require("express");
const router = express.Router();
const getSpeechTokenController = require("../controllers/token");

router.get("/api/get-speech-token", getSpeechTokenController);

module.exports = router;
