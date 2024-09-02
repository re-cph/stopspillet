import clsx from "clsx";
import {
  dayInMinutes,
  diffInDays,
  getDateString,
  getOpeningDayText,
  prependZero,
  removedPrefixedZero,
} from "../utils";
import type { ReactNode } from "react";

type Mode = "chat" | "phone";

type OpeningHourDayConfig = {
  day: number;
  hours: number;
  minutes: number;
};
type OpeningHourDateConfig = { date: string; hours: number; minutes: number };

type OpeningHourConfig = OpeningHourDayConfig | OpeningHourDateConfig;

interface OpeningHour {
  open: OpeningHourConfig;
  close: OpeningHourConfig;
}

interface OpeningHoursConfig {
  hours: OpeningHour[];
  holidays: string[];
  openTopText: string;
  openBottomText: string;
  closedTopText: string;
  closedBottomText: string;
  action: (openNow: boolean) => JSX.Element;
}

type OpeningHourInterrim =
  | {
      open: OpeningHourDayConfig;
      close: OpeningHourDayConfig;
      date: string;
      diff: number;
    }
  | {
      open: OpeningHourDayConfig;
      close: OpeningHourDayConfig;
      specificDate: string;
      diff: number;
    };

/* NOW YOU CAN TOUCH */

/* HOW STUFF WORKS
 * Holidays:
 * Holidays are defined in the array below.
 * If an opening hour matches a date given holiday,
 * it will override the opening hour and print it as closed.
 * Holidays do not need to be sorted.
 * You have to use the exact format 'YYYY-MM-DD' to match a holiday
 * - CORRECT: '2021-01-01'
 * - INCORRECT: '2021-1-1'
 */

const HOLIDAYS = [
  "2022-06-06",
  "2022-12-26",
  "2023-04-06",
  "2023-04-07",
  "2023-04-10",
  "2023-05-05",
  "2023-05-18",
  "2023-05-29",
  "2023-12-24",
  "2023-12-25",
  "2023-12-26",
  "2023-12-27",
  "2023-12-28",
  "2023-12-29",
  "2023-12-30",
  "2023-12-31",
  "2024-01-01",
  "2024-03-28",
  "2024-03-29",
  "2024-04-01",
  "2024-04-26",
  "2024-05-09",
  "2024-05-20",
  "2024-06-05",
  "2024-12-25",
  "2024-12-26",
];

/* HOW STUFF WORKS
 * Opening hours:
 * You can add and remove opening hours by adding a config object to the hours array.
 * You need to define a open and close attribute, which include the following attributes:
 * - day: The day of the week, using the javascript notation. https://www.w3schools.com/jsref/jsref_getday.asp
 * - hours: hour of the day
 * - minutes: minute of the day
 * The code checks whether the day is the same as the current day, and then checks if
 * the current time is between hours and minutes.
 * Note: open includes the current time, close does not.
 * Example: {open: {day: 1, hours: 12, minutes: 0}, close: {day: 1, hours: 15, minutes: 0}}
 * This states the opening hours are on a monday, between 12.00.00 and 14.59.59
 * You can add multiple opening hours on a particular day, but be careful, the attributes are not validated.
 * Please sort the entries manually, starting with day 0.
 */

const OPENING_HOURS_CONFIG_CHAT: OpeningHoursConfig = {
  hours: [
    {
      open: { day: 1, hours: 17, minutes: 0 },
      close: { day: 1, hours: 21, minutes: 0 },
    },
    {
      open: { day: 2, hours: 17, minutes: 0 },
      close: { day: 2, hours: 21, minutes: 0 },
    },
    {
      open: { day: 3, hours: 17, minutes: 0 },
      close: { day: 3, hours: 21, minutes: 0 },
    },
    {
      open: { day: 4, hours: 17, minutes: 0 },
      close: { day: 4, hours: 21, minutes: 0 },
    },
    // Specific dates
    {
      open: { date: "2022-12-27", hours: 17, minutes: 0 },
      close: { date: "2022-12-27", hours: 21, minutes: 0 },
    },
    {
      open: { date: "2022-12-29", hours: 9, minutes: 0 },
      close: { date: "2022-12-29", hours: 15, minutes: 0 },
    },
    {
      open: { date: "2022-12-29", hours: 17, minutes: 0 },
      close: { date: "2022-12-29", hours: 21, minutes: 0 },
    },
    {
      open: { date: "2022-12-30", hours: 9, minutes: 0 },
      close: { date: "2022-12-30", hours: 14, minutes: 0 },
    },
  ],
  holidays: HOLIDAYS,
  openTopText: "Vores chat er åben",
  openBottomText: "Vi er klar til at chatte indtil $$ i dag",
  closedTopText: "Chatten er lukket. Vi åbner igen",
  closedBottomText: "$$",
  action: () => (
    <iframe
      height="60"
      src="https://phs.basechat.com/aspxIM/chat-contact.aspx?winid=430721183264"
      className="w-full"
    />
  ),
};

const OPENING_HOURS_CONFIG_PHONE: OpeningHoursConfig = {
  hours: [
    {
      open: { day: 1, hours: 9, minutes: 0 },
      close: { day: 1, hours: 21, minutes: 0 },
    },
    {
      open: { day: 2, hours: 9, minutes: 0 },
      close: { day: 2, hours: 21, minutes: 0 },
    },
    {
      open: { day: 3, hours: 9, minutes: 0 },
      close: { day: 3, hours: 21, minutes: 0 },
    },
    {
      open: { day: 4, hours: 9, minutes: 0 },
      close: { day: 4, hours: 21, minutes: 0 },
    },
    {
      open: { day: 5, hours: 9, minutes: 0 },
      close: { day: 5, hours: 17, minutes: 0 },
    },
    // Specific dates
    {
      open: { date: "2022-12-27", hours: 9, minutes: 0 },
      close: { date: "2022-12-27", hours: 21, minutes: 0 },
    },
    {
      open: { date: "2022-12-28", hours: 9, minutes: 0 },
      close: { date: "2022-12-28", hours: 21, minutes: 0 },
    },
    {
      open: { date: "2022-12-29", hours: 9, minutes: 0 },
      close: { date: "2022-12-29", hours: 21, minutes: 0 },
    },
    {
      open: { date: "2022-12-30", hours: 9, minutes: 0 },
      close: { date: "2022-12-30", hours: 17, minutes: 0 },
    },
  ],
  holidays: HOLIDAYS,
  openTopText: "Vores telefoner er åbne",
  openBottomText: "Vi er klar til at tale indtil $$ i dag",
  closedTopText: "Telefonerne er lukkede. Vi åbner igen",
  closedBottomText: "$$",
  action: (openNow) => {
    if (!openNow) return <></>;
    return (
      <a
        href="tel:70222825"
        className={clsx(
          "h-[60px] flex justify-center items-center bg-primary text-white hover:bg-light hover:text-primary transition-all text-[32px] font-semibold rounded",
        )}
      >
        Ring 70 22 28 25
      </a>
    );
  },
};

const CONFIG: Record<Mode, OpeningHoursConfig> = {
  chat: OPENING_HOURS_CONFIG_CHAT,
  phone: OPENING_HOURS_CONFIG_PHONE,
};

function getNextOpenHours(
  currentDate: Date,
  hours: OpeningHour[],
  holidays: string[],
) {
  let nextOpenHours;
  let weekOffset = 0;

  while (nextOpenHours === undefined) {
    const mappedNextHours = hours
      .map((config): OpeningHourInterrim | undefined => {
        const currentDay = currentDate.getDay();

        if ("date" in config.open) {
          const day = new Date(config.open.date);
          const diff = diffInDays(day);

          if (diff < 0) {
            return undefined;
          }

          return {
            open: {
              ...config.open,
              day: day.getDay(),
            },
            close: {
              ...config.close,
              day: day.getDay(),
            },
            specificDate: config.open.date,
            diff,
          } satisfies OpeningHourInterrim;
        } else {
          const nextDay = config.open.day;
          const diff =
            nextDay < currentDay
              ? nextDay + 7 - currentDay
              : nextDay - currentDay;

          const nextDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() + diff + weekOffset,
          );

          return {
            open: {
              ...config.open,
              day: nextDay,
            },
            close: {
              ...config.close,
              day: nextDay,
            },
            date: getDateString(nextDate),
            diff: diff + weekOffset,
          } satisfies OpeningHourInterrim;
        }
      })

      .filter((value): value is OpeningHourInterrim => value !== undefined)

      .reduce((arr, day) => {
        if ("date" in day) return [...arr, day];

        return [
          ...arr.filter((item) => {
            if ("specificDate" in item) return true;
            return item.date !== day.specificDate;
          }),
          day,
        ];
      }, [] as OpeningHourInterrim[])

      .map((day) => {
        if ("date" in day) return day;

        const { specificDate, ...rest } = day;
        return {
          ...rest,
          specificDate,
          date: specificDate,
        };
      })
      .sort((a, b) => {
        if (a.date === b.date) {
          return 0;
        }
        return a.date > b.date ? 1 : -1;
      })
      .filter((day) => !holidays.includes(day.date))
      .filter((day) => {
        // Filter out past opening hours
        if (
          day.diff === 0 &&
          dayInMinutes(day.close.day, day.close.hours, day.close.minutes) <=
            dayInMinutes(
              currentDate.getDay(),
              currentDate.getHours(),
              currentDate.getMinutes(),
            )
        ) {
          return false;
        } else {
          return true;
        }
      });

    if (mappedNextHours.length > 0) {
      nextOpenHours = mappedNextHours[0];
      break;
    }
    weekOffset += 7;
  }

  return nextOpenHours;
}

function getIcon(mode: Mode) {
  if (mode === "chat") return "/images/openingHours_chat.png";
  return "/images/openingHours_phone.png";
}

const useOpeningHours = (
  mode: Mode,
): {
  openNow: boolean;
  topText: string;
  bottomText: string;
  action: OpeningHoursConfig["action"];
} => {
  const config = CONFIG[mode];

  const tempDate = new Date();
  const currentDayInMinutes = dayInMinutes(
    tempDate.getDay(),
    tempDate.getHours(),
    tempDate.getMinutes(),
  );

  const nextOpenHours = getNextOpenHours(
    tempDate,
    config.hours,
    config.holidays,
  );

  const openNow =
    nextOpenHours.diff === 0 &&
    dayInMinutes(
      nextOpenHours.open.day,
      nextOpenHours.open.hours,
      nextOpenHours.open.minutes,
    ) <= currentDayInMinutes &&
    dayInMinutes(
      nextOpenHours.close.day,
      nextOpenHours.close.hours,
      nextOpenHours.close.minutes,
    ) > currentDayInMinutes;

  if (openNow) {
    const closingHours = nextOpenHours.close.hours.toString();
    const closingMinutes = nextOpenHours.close.minutes.toString();
    const closingText =
      "kl. " + [closingHours, prependZero(closingMinutes)].join(":");

    return {
      openNow,
      topText: config.openTopText.replaceAll("$$", closingText),
      bottomText: config.openBottomText.replaceAll("$$", closingText),
      action: config.action,
    };
  } else {
    let openingText = getOpeningDayText(
      tempDate.getDay(),
      nextOpenHours.open.day,
      false,
    );

    const openingHours = nextOpenHours.open.hours.toString();
    const openingMinutes = nextOpenHours.open.minutes.toString();

    if (nextOpenHours.diff > 7) {
      const openingDateElements = nextOpenHours.date.split("-");
      openingText +=
        " d. " +
        removedPrefixedZero(openingDateElements[2]) +
        "/" +
        removedPrefixedZero(openingDateElements[1]) +
        ",";
    }

    openingText +=
      " kl. " + [openingHours, prependZero(openingMinutes)].join(":");

    return {
      openNow,
      topText: config.closedTopText.replaceAll("$$", openingText),
      bottomText: config.closedBottomText.replaceAll("$$", openingText),
      action: config.action,
    };
  }
};

export function OpeningHours({
  mode,
  className,
}: {
  mode: Mode;
  className?: string;
}) {
  const { openNow, topText, bottomText, action } = useOpeningHours(mode);

  return (
    <div className={clsx("space-y-2.5", className)}>
      <div className="bg-black/30 grid p-4 gap-x-4 gap-y-2.5 text-white rounded">
        <img src={getIcon(mode)} className="w-8 h-8 row-span-2" alt="" />
        <div
          className={clsx(
            "col-start-2",
            openNow ? "text-[30px]" : "text-[20px]",
            "leading-none",
            "font-normal",
          )}
        >
          {topText}
        </div>
        <div
          className={clsx(
            "col-start-2",
            openNow ? "text-[20px]" : "text-[30px]",
            "leading-none",
            "font-normal",
          )}
        >
          {bottomText}
        </div>
      </div>
      {action(openNow)}
    </div>
  );
}
