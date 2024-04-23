import axios from "axios";

async function translateText(textData, from, to) {
  try {
    const data = JSON.stringify([
      {
        text: textData,
      },
    ]);
    const response = await axios.post(
      `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=${from}&to=${to}`,
      data,
      {
        headers: {
          "Ocp-Apim-Subscription-Key": "8b8b84d748a9484dafbeaaee3c6138cf",
          "Ocp-Apim-Subscription-Region": "eastasia",
          "Content-type": "application/json",
          "X-ClientTraceId": "uuidv4().toString()",
        },
      }
    );
    const translatedText = response.data[0].translations[0].text;
    return {
      success: true,
      message: "Translation successful",
      translatedText: translatedText,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Translation failed",
    };
  }
}

export default translateText;