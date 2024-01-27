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
    return num.toString();
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
