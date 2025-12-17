import { compareDateStrings } from "../utils";

interface Holiday {
  startDate: string;
  endDate: string;
  title: string;
  excerpt: string;
}

/* HOW STUFF WORKS
 * Holiday message:
 * You can add holidays by adding an object to the array below:
 * The attributes for the object are:
 * - startDate: Date to start the message
 * - endDate: Date to end the message
 * - title: Holiday title
 * - excerpt: Descriptive text
 * Both startDate and endDate are inclusive, meaning the message
 * will be shown on both dates.
 */

const HOLIDAYS: Holiday[] = [
  {
    startDate: "2025-05-27",
    endDate: "2025-05-31",
    title: "NB: Kristi himmelfartsdag og fredag",
    excerpt:
      "Telefonen og chatten holder lukket fra 29. maj til og med 30. maj.",
  },
  {
    startDate: "2025-12-18",
    endDate: "2026-01-01",
    title: "NB: Jul og nytår",
    excerpt:
      "Telefonen og chatten holder lukket fra og med den 24. december til og med den 1. januar.",
  },
];

const useHoliday = () => {
  const currentDate = new Date().toJSON().split("T")[0];
  const activeHoliday = HOLIDAYS.find(function (h) {
    return (
      compareDateStrings(h.startDate, currentDate) &&
      compareDateStrings(currentDate, h.endDate)
    );
  });

  return { activeHoliday };
};

export function HolidayMessage() {
  const { activeHoliday } = useHoliday();

  if (!activeHoliday) return;

  return (
    <div className="mt-4">
      <p className="font-bold">{activeHoliday.title}</p>
      <p>{activeHoliday.excerpt}</p>
    </div>
  );
}
