export default function formattedMessage(messages) {
  return messages
    .map((message) => `${message.author.username} : ${message.message}`)
    .join("\n");
}
