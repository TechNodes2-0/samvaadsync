# Live Translations in video calls with Audio Connector

This is a demo application that allows for real-time translations feature in a video call with implemented with the Vonage [Audio Connector](https://tokbox.com/developer/guides/audio-connector/) and Microsoft Azure [AI Speech Service](https://azure.microsoft.com/en-us/products/ai-services/speech-translation).

There is a companion [blog post](https://developer.vonage.com/en/blog/video-ai-live-translations-with-audio-connector) that you can read to learn more about the application works.

This demo is more of a showcase of a feature that can be created using the Vonage Audio Connector. It is not necessarily production ready.

## Credentials

To get be able to run the demo, you will need to fill in all the fields in the `credentials.js` file.

`VONAGE_API_KEY` and `VONAGE_API_SECRET` can be found in this [dashboard](https://tokbox.com/account/).

`AZURE_SUBSCRIPTION_KEY` and `AZURE_SERVICE_REGION` can be found in this [dashboard](https://portal.azure.com/).

## Running the application

### On the Web

[Deploy to CodeSandbox.io](https://githubbox.com/Vonage-Community/demo-video-node-audio_connector-live_translations)

One click, fill in `credentials.js`, and have a working demo. 

### Locally

- Clone this repo.
- `npm install` the dependencies
- fill in `credentials.js`
- this application uses a WebSocket Server that is publically available on the internet. A tool like [ngrok](https://ngrok.com/) or [localtunnel](https://github.com/localtunnel/localtunnel) can be used to accomplish this. Some modification to the code may need to be done.

