function formatTimestamp(utcTimestamp) {
  const date = new Date(utcTimestamp);
  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    day: "numeric",
    month: "numeric",
  };

  const formattedDate = date.toLocaleString("en-US", options);
  return formattedDate;
}

export default formatTimestamp;
