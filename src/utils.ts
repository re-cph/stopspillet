/* DO NOT TOUCH */
export function diffInDays(future: Date): number {
  const currentDate = new Date();

  const present = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
  );

  // One day Time in ms (milliseconds)
  const ONE_DAY = 1000 * 60 * 60 * 24;

  // To Calculate the result in milliseconds and then converting into days
  const Result = Math.round(future.getTime() - present.getTime()) / ONE_DAY;

  // To remove the decimals from the (Result) resulting days value
  return parseInt(Result.toFixed(0));
}

export function getOpeningDayText(
  today: number,
  next: number,
  skipToday: boolean,
) {
  if (today === next && !skipToday) {
    return "i dag";
  } else if (today + 1 === next || (next === 6 && today === 0)) {
    return "i morgen";
  } else {
    switch (next) {
      case 1:
        return "mandag";
      case 2:
        return "tirsdag";
      case 3:
        return "onsdag";
      case 4:
        return "torsdag";
      case 5:
        return "fredag";
      case 6:
        return "lørdag";
      case 0:
      default:
        return "søndag";
    }
  }
}

export function dayInMinutes(
  day: number,
  hours: number,
  minutes: number,
): number {
  return day * 24 * 60 + hours * 60 + minutes;
}

export function compareDateStrings(a: string, b: string): boolean {
  var left = a.split("-");
  var right = b.split("-");

  var leftDate = new Date(
    parseInt(left[0]),
    parseInt(left[1]) - 1,
    parseInt(left[2]),
  );
  var rightDate = new Date(
    parseInt(right[0]),
    parseInt(right[1]) - 1,
    parseInt(right[2]),
  );

  return leftDate <= rightDate;
}

export function getDateString(date: Date): string {
  return [
    date.getFullYear(),
    prependZero(date.getMonth() + 1),
    prependZero(date.getDate()),
  ].join("-");
}

export function prependZero(input: string | number): string {
  const str = typeof input === "number" ? input.toString() : input;
  return str.length < 2 ? "0" + str : str;
}

export function removedPrefixedZero(str: string): string {
  if (str[0] === "0") {
    return str.substring(1);
  }
  return str;
}
