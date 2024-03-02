export default function getCurrentTimeIST() {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  };
  const currentTime = new Date().toLocaleTimeString("en-US", options);
  return currentTime;
}
