export function getTimeSinceJoining(joinedAt) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const joinedDate = new Date(joinedAt);
  const currentDate = new Date();

  const elapsedYears = currentDate.getFullYear() - joinedDate.getFullYear();
  const elapsedMonths = currentDate.getMonth() - joinedDate.getMonth();

  if (elapsedYears === 0 && elapsedMonths === 0) {
    return "joinedAt: less than a day ago";
  } else if (elapsedYears === 0 && elapsedMonths === 1) {
    return "joinedAt: a month ago";
  } else if (elapsedYears === 0 && elapsedMonths > 1) {
    return `joinedAt: ${elapsedMonths} months ago`;
  } else if (elapsedYears === 1) {
    return "joinedAt: a year ago";
  } else if (elapsedYears > 1) {
    return `joinedAt: ${elapsedYears} years ago`;
  }
}
