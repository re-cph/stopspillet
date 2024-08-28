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
    startDate: "2024-03-27",
    endDate: "2024-04-01",
    title: "NB: Lukket i påsken",
    excerpt:
      "Telefonen og chatten holder lukket fra 28. marts til og med 1. april.",
  },
  {
    startDate: "2024-04-25",
    endDate: "2024-04-26",
    title: "NB: Lukket Store Bededag",
    excerpt: "Telefonen og chatten holder lukket 26. april.",
  },
  {
    startDate: "2024-05-08",
    endDate: "2024-05-09",
    title: "NB: Lukket Kristi Himmelfartsdag",
    excerpt: "Telefonen og chatten holder lukket 9. maj.",
  },
  {
    startDate: "2024-05-17",
    endDate: "2024-05-20",
    title: "NB: Lukket 2. Pinsedag",
    excerpt: "Telefonen og chatten holder lukket 20. maj.",
  },
  {
    startDate: "2024-06-04",
    endDate: "2024-06-05",
    title: "NB: Lukket Grundlovsdag",
    excerpt: "Telefonen og chatten holder lukket 5. juni.",
  },
  {
    startDate: "2024-12-24",
    endDate: "2024-12-26",
    title: "NB: Lukket i juledagene",
    excerpt: "Telefonen og chatten holder lukket 25. og 26. december.",
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
