/* global OT */

const login = document.querySelector("#login");
const appContainer = document.querySelector("#app-container");
const translationsContainer = document.querySelector("#translations-container");
const translationsFeed = document.querySelector("#translations-feed");
const closeButton = document.querySelector("#close");
const nameInput = document.querySelector("#name");
const enterBtn = document.querySelector("#enter-button");
const spokenSelect = document.querySelector("#spoken-select");
const targetSelect = document.querySelector("#target-select");
const leaveBtn = document.querySelector("#leave-button");
const translateBtn = document.querySelector("#translate-button");

let apiKey;
let sessionId;
let token;
let session;
let streamId;
let connectionId;
let socketConnectionId;

let showTranslations = false;

function handleError(error) {
  if (error) {
    console.error(error);
    alert(error);
  }
}

function initializeSession() {
  console.log("initializeSession");
  // session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream
  session.on("streamCreated", (event) => {
    const subscriberOptions = {
      insertMode: "append",
      width: "360px",
      height: "240px",
    };
    const subscriber = session.subscribe(
      event.stream,
      "subscribers",
      subscriberOptions,
      handleError
    );
  });

  session.on("sessionDisconnected", (event) => {
    console.log("You were disconnected from the session.", event.reason);
  });

  session.on("signal:translation", (event) => {
    if (showTranslations) {
      const signalData = JSON.parse(event.data);
      if (signalData.translations[targetSelect.value] !== undefined) {
        translationsFeed.innerHTML += `
        <div class="translation">
          <div class="speaker">${signalData.speaker}: &nbsp;&nbsp;</div>
          <div class="text">${signalData.translations[targetSelect.value]}</div>
        </div>`;
        const isFeedAtBottom =
          translationsFeed.offsetHeight + translationsFeed.scrollTop ===
          translationsFeed.scrollHeight;
        if (isFeedAtBottom) {
          const translationElems = document.querySelectorAll(".translation");
          console.log("translationElems.length: ", translationElems.length);
          translationElems[translationElems.length - 1].scrollIntoView();
        }
      }
    }
  });

  // Connect to the session
  session.connect(token, (error) => {
    if (error) {
      console.log("session.connect error", session);
      handleError(error);
    } else {
      login.style.display = "none";
      appContainer.style.display = "block";
      // If the connection is successful, publish the publisher to the session
      // initialize the publisher
      const publisherOptions = {
        insertMode: "append",
        width: "360px",
        height: "240px",
        name: nameInput.value,
      };
      const publisher = OT.initPublisher(
        "publisher",
        publisherOptions,
        (error) => {
          if (error) {
            console.log("publisher error");
            handleError(error);
          } else {
            console.log("publisher good to go!");
            console.log("publisher: ", publisher);
            streamId = publisher.streamId;
            connectionId = publisher.session.connection.connectionId;
            console.log("streamId: ", streamId);
            console.log("connectionId: ", connectionId);
          }
        }
      );

      session.publish(publisher, (error) => {
        if (error) {
          handleError(error);
        } else {
          // publishing to session, now create Audio Connector WebSocket connection!
          fetch("/connect", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              sessionId,
              connectionId,
              streamId,
              speaker: nameInput.value,
              spoken: spokenSelect.value,
              target: targetSelect.value,
            }),
          })
            .then((response) => response.json())
            .then((socketData) => {
              console.log({ socketData });
              socketConnectionId = socketData.socket.connectionId;
              translateBtn.disabled = false;
            });
        }
      });
    }
  });

  leaveBtn.addEventListener("click", () => {
    fetch(`/disconnect/${socketConnectionId}`)
      .then((response) => response.json())
      .then((disconnectData) => {
        console.log({ disconnectData });
        session.disconnect();
        appContainer.style.display = "none";
        nameInput.value = "";
        login.style.display = "flex";
        translateBtn.disabled = true;
      });
  });
}

enterBtn.addEventListener("click", () => {
  // Make a GET request to get the OpenTok API key, session ID, and token from the server
  fetch("/session")
    .then((response) => response.json())
    .then((sessionData) => {
      apiKey = sessionData.apiKey;
      sessionId = sessionData.sessionId;
      token = sessionData.token;
      // Initialize an OpenTok Session object
      // initializeSession();
    });
});

translateBtn.addEventListener("click", () => {
  // Make a POST request to get the OpenTok API key, session ID, and token from the server
  fetch("/translate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sessionId,
      connectionId,
      speaker: nameInput.value,
      spoken: spokenSelect.value,
      target: targetSelect.value,
    }),
  })
    .then((response) => response.json())
    .then((translateData) => {
      console.log({ translateData });
      translationsContainer.style.display = "block";
      showTranslations = true;
      translateBtn.disabled = true;
    });
});

closeButton.addEventListener("click", () => {
  translationsContainer.style.display = "none";
  showTranslations = false;
  translateBtn.disabled = false;
});
