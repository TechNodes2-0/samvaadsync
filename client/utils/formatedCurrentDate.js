export default function getFormattedDate() {
  const options = { day: "2-digit", month: "short", year: "2-digit" };
  const currentDate = new Date();
  const month = currentDate.toLocaleDateString("en-US", { month: "short" });
  const year = currentDate.toLocaleDateString("en-US", { year: "2-digit" });
  const day = currentDate.toLocaleDateString("en-US", { day: "2-digit" });

  return `${day} ${month} ${year}`;
}
