export function viewsFormat(num: number): string {
  const billion = 1000000000;
  const million = 1000000;
  const thousand = 1000;

  if (num >= billion) {
    return (num / billion).toFixed(1) + "M";
  } else if (num >= million) {
    return (num / million).toFixed(1) + "B";
  } else if (num >= thousand) {
    return (num / thousand).toFixed(1) + "K";
  } else {
    return (num ?? 0)?.toString();
  }
}

export function convertMillisecondsToTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  if (hours <= 0) {
    return `${minutes < 10 ? `0${minutes}` : minutes}:${
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
    }`;
  } else {
    return `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  }
}
export function getCreationDateDifference(date: Date): string {
  const nowTimestamp = Date.now();
  const dateTimestamp = date.getTime();
  const differenceInMs = nowTimestamp - dateTimestamp;

  const minutes = Math.floor(differenceInMs / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  let formattedDiff: string;
  if (minutes < 60) {
    formattedDiff = `${minutes} min ago`;
  } else if (hours < 24) {
    formattedDiff = hours < 2 ? `${hours} hour ago` : `${hours} hours ago`;
  } else if (days < 30) {
    formattedDiff = days < 2 ? `${days} day ago` : `${days} days ago`;
  } else if (months < 12) {
    formattedDiff = months < 2 ? `${months} month ago` : `${months} months ago`;
  } else {
    formattedDiff = years < 2 ? `${years} year ago` : `${years} years ago`;
  }

  return formattedDiff;
}
