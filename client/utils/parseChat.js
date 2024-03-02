export default function parseChat(apiResponse) {
  console.log("Parsing chat data...", apiResponse);
  const data = {
    ExtractedDetails: {},
    ParagraphSummary: "",
    BulletSummary: [],
  };

  const detailsRegex =
    /Client Name: (.+?)\nExperience: (.+?)\nLocation: (.+?)\nAvailability: (.+?)\nVisa Status: (.+?)\nSkills: (.+?)\nRelocation: (.+?)\n/;

  const detailsMatch = apiResponse.match(detailsRegex);

  if (detailsMatch) {
    data.ExtractedDetails = {
      "Client Name": detailsMatch[1],
      Experience: detailsMatch[2],
      Location: detailsMatch[3],
      Availability: detailsMatch[4],
      "Visa Status": detailsMatch[5],
      Skills: detailsMatch[6],
      Relocation: detailsMatch[7],
    };
  } else {
    console.error("Error matching details.");
  }

  const paragraphRegex =
    /Paragraph Summary:\n([\s\S]+?)\n\nBullet-point Summary:\n([\s\S]+)/;

  const paragraphMatch = apiResponse.match(paragraphRegex);

  if (paragraphMatch) {
    data.ParagraphSummary = paragraphMatch[1];
    const bulletSummaryRegex = /- (.+?)\n/g;
    let match;

    while ((match = bulletSummaryRegex.exec(paragraphMatch[2])) !== null) {
      data.BulletSummary.push(match[1]);
    }
  } else {
    console.error("Error matching paragraph summary.");
  }

  return data;
}
