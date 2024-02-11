"use strict";
const credentials = require("./credentials");
const fs = require("fs");
const express = require("express");
const OpenTok = require("opentok");
const sdk = require("microsoft-cognitiveservices-speech-sdk");

const app = express();
app.use(express.json());
const port = 8080;
const path = require("path");
const expressWs = require("express-ws")(app);

app.use(express.static("static"));

const apiKey = credentials.VONAGE_API_KEY;
const apiSecret = credentials.VONAGE_API_SECRET;
const subscriptionKey = credentials.AZURE_SUBSCRIPTION_KEY;
const serviceRegion = credentials.AZURE_SERVICE_REGION;
const websocketURI = `wss://${credentials.APP_DOMAIN}`;
const defaultTargetLanguage = credentials.DEFAULT_TARGET_LANGUAGE;

const targetLanguagesToAdd = new Set();
targetLanguagesToAdd.add(defaultTargetLanguage);

// Verify that the credentials are defined
if (
  !apiKey ||
  !apiSecret ||
  !subscriptionKey ||
  !serviceRegion ||
  !websocketURI ||
  !defaultTargetLanguage
) {
  console.log("You must specify all values in credentials.js");
  process.exit(1);
}

const opentok = new OpenTok(apiKey, apiSecret);
// Create a session and store session ID in the express app
const sessionOptions = {
  mediaMode: "routed",
};

opentok.createSession(sessionOptions, (err, session) => {
  if (err) throw err;
  app.set("sessionId", session.sessionId);
  // We will wait on starting the app until this is done
  init();
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve("pages/index.html"));
});

app.get("/session", async (req, res) => {
  console.log("/session");
  const sessionId = app.get("sessionId");
  const token = opentok.generateToken(sessionId);
  res.setHeader("Content-Type", "application/json");
  res.send({
    apiKey,
    sessionId,
    token,
  });
});

app.post("/connect", async (req, res) => {
  console.log("/connect");
  const sessionId = app.get("sessionId");
  const token = opentok.generateToken(sessionId);
  const { streamId, connectionId, speaker, spoken } = req.body;
  console.log({ streamId, connectionId, speaker, spoken });
  opentok.websocketConnect(
    sessionId,
    token,
    `${websocketURI}/socket/${connectionId}/${speaker.replaceAll(
      " ",
      "_"
    )}/${spoken}`,
    { streams: [streamId] },
    function (error, socket) {
      if (error) {
        console.log("Error:", error.message);
        res.setHeader("Content-Type", "application/json");
        res.send({ error: error.message });
      } else {
        console.log("Audio Connector WebSocket connected: ", socket);
        res.setHeader("Content-Type", "application/json");
        res.send({
          socket,
        });
      }
    }
  );
});

app.get("/disconnect/:connectionId", (req, res) => {
  console.log("/disconnect: ", req.params.connectionId);
  const sessionId = app.get("sessionId");
  opentok.forceDisconnect(sessionId, req.params.connectionId, (error) => {
    if (error) {
      console.log("Error:", error.message);
      res.setHeader("Content-Type", "application/json");
      res.send({ error: error.message });
    } else {
      res.setHeader("Content-Type", "application/json");
      res.send({
        status: `connection ${req.params.connectionId} disconnected`,
      });
    }
  });
});

app.post("/translate", (req, res) => {
  console.log("/translate");
  targetLanguagesToAdd.add(req.body.target);
  res.setHeader("Content-Type", "application/json");
  res.send({
    status: "started",
  });
});

app.ws("/socket/:connectionId/:speaker/:spoken", (ws, req) => {
  const sessionId = app.get("sessionId");
  const speechTranslationConfig = sdk.SpeechTranslationConfig.fromSubscription(
    subscriptionKey,
    serviceRegion
  );
  speechTranslationConfig.speechRecognitionLanguage = req.params.spoken;
  speechTranslationConfig.addTargetLanguage(defaultTargetLanguage);
  const pushStream = sdk.AudioInputStream.createPushStream();
  const audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);
  const recognizer = new sdk.TranslationRecognizer(
    speechTranslationConfig,
    audioConfig
  );

  recognizer.recognized = function (s, e) {
    console.log("recognized connectionId: ", req.params.connectionId);
    // Note: Can not get all translations at once: https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-translate-speech?tabs=terminal&pivots=programming-language-javascript#choose-one-or-more-target-languages
    targetLanguagesToAdd.forEach((lang) => {
      recognizer.addTargetLanguage(lang);
    });
    let translations = {};
    recognizer.targetLanguages.forEach((lang) => {
      translations[lang] = e.result.translations.get(lang);
    });
    console.log("translations: ",speaker, speatranslations);
    opentok.signal(
      sessionId,
      null,
      {
        type: "translation",
        data: JSON.stringify({
          speaker: req.params.speaker,
          translations,
        }),
      },
      function (error) {
        if (error) return console.log("error:", error);
      }
    );
  };
  recognizer.startContinuousRecognitionAsync(
    function (result) {
      console.log("result: ", result);
    },
    function (err) {
      console.log("err: ", err);
      recognizer.close();
      recognizer = undefined;
    }
  );

  ws.on("message", (msg) => {
    try {
      const msgJSON = JSON.parse(msg);
      console.log(
        `/socket/${req.params.connectionId}/${req.params.speaker}/${req.params.spoken}: `,
        msgJSON
      );
    } catch (err) {
      pushStream.write(msg);
    }
  });
});

function init() {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}
