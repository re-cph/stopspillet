jQuery(function($) {
    /* DO NOT TOUCH */
    function diffInDays(future) {
        const currentDate = new Date();

        const present = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate()
        );

        // One day Time in ms (milliseconds)
        const ONE_DAY = 1000 * 60 * 60 * 24
        
        // To Calculate the result in milliseconds and then converting into days
        const Result = Math.round(future.getTime() - present.getTime()) / (ONE_DAY);
        
        // To remove the decimals from the (Result) resulting days value
        return parseInt(Result.toFixed(0));
    }

    function getOpeningDayText(today, next, skipToday) {
        if (today === next && !skipToday) {
            return 'i dag'
        } else if (
            today + 1 === next ||
            (next === 6 && today === 0)
        ) {
            return 'i morgen'
        } else {
            switch (next) {
                case 1:
                    return 'mandag';
                case 2:
                    return 'tirsdag';
                case 3:
                    return 'onsdag';
                case 4:
                    return 'torsdag';
                case 5:
                    return 'fredag';
                case 6:
                    return 'lørdag';
                case 0:
                default:
                    return 'søndag';
            }
        }
    }

    function dayInMinutes (day, hours, minutes) {
        return (day * 24 * 60) + (hours * 60) + minutes;
    }

    function compareDateStrings (a, b) {
        var left = a.split('-');
        var right = b.split('-');

        var leftDate = new Date(left[0], left[1] - 1, left[2]);
        var rightDate = new Date(right[0], right[1] - 1, right[2]);

        return leftDate <= rightDate;
    }

    function getDateString (d) {
        return [
            d.getFullYear(),
            prependZero(d.getMonth() + 1),
            prependZero(d.getDate()),
        ].join('-');
    }

    function prependZero (input) {
        var str = typeof input === 'number' ? input.toString() : input;
        return str.length < 2 ? "0" + str : str;
    }

    function removedPrefixedZero (str) {
        if (str[0] === '0') {
            return str.substring(1);
        }
        return str;
    }

    function getNextOpenHours (currentDate, hours, holidays) {
        var nextOpenHours;
        var weekOffset = 0;

        function mapNextHours (c) {
            const currentDay = currentDate.getDay();
            const nextDay = c.open.day;

            if (typeof nextDay === 'string') {
                const day = new Date(nextDay);
                const diff = diffInDays(day);

                if (diff < 0) {
                    return
                }

                return {
                    open: {
                        ...c.open,
                        day: day.getDay()
                    },
                    close: {
                        ...c.close,
                        day: day.getDay()
                    },
                    specificDate: nextDay,
                    diff: diffInDays(day),
                }
            } else {
                const diff = nextDay < currentDay ? (nextDay + 7) - currentDay : nextDay - currentDay;
    
                const nextDate = new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    currentDate.getDate() + diff + weekOffset
                );
    
                return {
                    open: c.open,
                    close: c.close,
                    date: getDateString(nextDate),
                    diff: diff + weekOffset,
                }
            }
        }

        function filterSpecificDates (arr, day) {
            let rtnArr = arr;
            if (day.specificDate) {
                rtnArr = arr.filter(item => item.date !== day.specificDate)
            }
            return [...rtnArr, day];
        }

        function normalizeData (day) {
            let rtnData = day;
            rtnData.date = day.specificDate || day.date;
            delete rtnData.specificDate;
            return rtnData;
        }

        function sortDates (a, b) {
            if (a.date === b.date) {
                return 0;
            }
            return a.date > b.date ? 1 : -1;
        }

        function filterHolidays (day) {
            return !holidays.includes(day.date)
        }

        function filterPastOpeningHours (day) {
            // Filter out past opening hours
            if (
                day.diff === 0 && (
                    dayInMinutes(day.close.day, day.close.hours, day.close.minutes) <=
                    dayInMinutes(currentDate.getDay(), currentDate.getHours(), currentDate.getMinutes())
                )
            ) {
                return false;
            } else {
                return true;
            }
        }

        while (nextOpenHours === undefined) {
            var mappedNextHours = hours
                .map(mapNextHours)
                .filter(Boolean)
                .reduce(filterSpecificDates, [])
                .map(normalizeData)
                .sort(sortDates)
                .filter(filterHolidays)
                .filter(filterPastOpeningHours);

            if (mappedNextHours.length > 0) {
                nextOpenHours = mappedNextHours[0];
                break;
            }
            weekOffset += 7;
        }

        return nextOpenHours;
    }

    function handleOpeningHours(id, config) {
        var element = $(id);
        // Determine if we're open at the moment
        var tempDate = new Date();
        var currentDayInMinutes = dayInMinutes(
            tempDate.getDay(), 
            tempDate.getHours(), 
            tempDate.getMinutes()
        );

        var nextOpenHours = getNextOpenHours(
            tempDate,
            config.hours,
            config.holidays
        );

        var openNow = nextOpenHours.diff === 0 && (
            dayInMinutes(nextOpenHours.open.day, nextOpenHours.open.hours, nextOpenHours.open.minutes) <= currentDayInMinutes &&
            dayInMinutes(nextOpenHours.close.day, nextOpenHours.close.hours, nextOpenHours.close.minutes) > currentDayInMinutes
        );

        if (openNow) {
            var closingHours = nextOpenHours.close.hours.toString();
            var closingMinutes = nextOpenHours.close.minutes.toString();
            var closingText = 'kl. ' + [closingHours, prependZero(closingMinutes)].join(':');

            element.find('.openingHours-topLine').html(config.openTopText.replace('$$', closingText)).addClass('openingHours-bigText');
            element.find('.openingHours-bottomLine').html(config.openBottomText.replace('$$', closingText));
            element.find('.openingHours-action').removeClass('openingHours-hidden');
        } else {
            var openingText = getOpeningDayText(
                tempDate.getDay(),
                nextOpenHours.open.day,
                false
            );

            var openingHours = nextOpenHours.open.hours.toString();
            var openingMinutes = nextOpenHours.open.minutes.toString();

            if (nextOpenHours.diff > 7) {
                var openingDateElements = nextOpenHours.date.split('-');
                openingText += ' d. ' + removedPrefixedZero(openingDateElements[2]) + '/' + removedPrefixedZero(openingDateElements[1]) + ',';
            }

            openingText += ' kl. ' + [openingHours, prependZero(openingMinutes)].join(':');

            element.find('.openingHours-topLine').html(config.closedTopText.replace('$$', openingText));
            element.find('.openingHours-bottomLine').html(config.closedBottomText.replace('$$', openingText)).addClass('openingHours-bigText');
        }
    }

    function handleHolidayMessage(id, config) {
        var elm = $(id);
        if (!elm || !config || !Array.isArray(config)) {
            return
        }

        var currentDate = new Date().toJSON().split('T')[0];
        var activeHoliday = config.find(function(h) {
            return compareDateStrings(h.startDate, currentDate) && compareDateStrings(currentDate, h.endDate);
        });

        if (activeHoliday) {
            elm.find('.holidays-title').html(activeHoliday.title);
            elm.find('.holidays-excerpt').html(activeHoliday.excerpt);
            elm.addClass('holidays__active');
        }
    }

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

    var holidays = [
        '2022-06-06',
        '2022-12-26',
        '2023-04-06',
        '2023-04-07',
        '2023-04-10',
        '2023-05-05',
        '2023-05-18',
        '2023-05-29',
        '2023-12-24',
        '2023-12-25',
        '2023-12-26',
        '2023-12-27',
        '2023-12-28',
        '2023-12-29',
        '2023-12-30',
        '2023-12-31',
        '2024-01-01',
        '2024-03-28',
        '2024-03-29',
        '2024-04-01',
        '2024-04-26',
        '2024-05-09',
        '2024-05-20',
        '2024-06-05',
        '2024-12-25',
        '2024-12-26',

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

    handleOpeningHours('#openingHoursChat', {
        hours: [
            // {open: {day: 1, hours: 12, minutes: 0}, close: {day: 1, hours: 15, minutes: 0}},
            // {open: {day: 2, hours: 12, minutes: 0}, close: {day: 2, hours: 15, minutes: 0}},
            // {open: {day: 4, hours: 12, minutes: 0}, close: {day: 4, hours: 15, minutes: 0}},
            {open: {day: 1, hours: 17, minutes: 0}, close: {day: 1, hours: 21, minutes: 0}},
            {open: {day: 2, hours: 17, minutes: 0}, close: {day: 2, hours: 21, minutes: 0}},
            {open: {day: 3, hours: 17, minutes: 0}, close: {day: 3, hours: 21, minutes: 0}},
            {open: {day: 4, hours: 17, minutes: 0}, close: {day: 4, hours: 21, minutes: 0}},
            // Specific dates
            {open: {day: '2022-12-27', hours: 17, minutes: 0}, close: {day: '2022-12-27', hours: 21, minutes: 0}},
            {open: {day: '2022-12-29', hours: 9, minutes: 0}, close: {day: '2022-12-29', hours: 15, minutes: 0}},
            {open: {day: '2022-12-29', hours: 17, minutes: 0}, close: {day: '2022-12-29', hours: 21, minutes: 0}},
            {open: {day: '2022-12-30', hours: 9, minutes: 0}, close: {day: '2022-12-30', hours: 14, minutes: 0}},
        ],
        holidays: holidays,
        openTopText: 'Vores chat er åben',
        openBottomText: 'Vi er klar til at chatte indtil $$ i dag',
        closedTopText: 'Chatten er lukket. Vi åbner igen',
        closedBottomText: '$$'
    });

    handleOpeningHours('#openingHoursPhone', {
        hours: [
            {open: {day: 1, hours: 9, minutes: 0}, close: {day: 1, hours: 21, minutes: 0}},
            {open: {day: 2, hours: 9, minutes: 0}, close: {day: 2, hours: 21, minutes: 0}},
            {open: {day: 3, hours: 9, minutes: 0}, close: {day: 3, hours: 21, minutes: 0}},
            {open: {day: 4, hours: 9, minutes: 0}, close: {day: 4, hours: 21, minutes: 0}},
            {open: {day: 5, hours: 9, minutes: 0}, close: {day: 5, hours: 17, minutes: 0}},
            // Specific dates
            {open: {day: '2022-12-27', hours: 9, minutes: 0}, close: {day: '2022-12-27', hours: 21, minutes: 0}},
            {open: {day: '2022-12-28', hours: 9, minutes: 0}, close: {day: '2022-12-28', hours: 21, minutes: 0}},
            {open: {day: '2022-12-29', hours: 9, minutes: 0}, close: {day: '2022-12-29', hours: 21, minutes: 0}},
            {open: {day: '2022-12-30', hours: 9, minutes: 0}, close: {day: '2022-12-30', hours: 17, minutes: 0}},
        ],
        holidays: holidays,
        openTopText: 'Vores telefoner er åbne',
        openBottomText: 'Vi er klar til at tale indtil $$ i dag',
        closedTopText: 'Telefonerne er lukkede. Vi åbner igen',
        closedBottomText: '$$'
    });

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

    handleHolidayMessage('#holidays', [
        {
            startDate: '2022-12-23',
            endDate: '2022-12-30',
            title: 'Åbningstider mellem jul og nytår',
            excerpt: `26. dec.: lukket <br>
27. dec.: Tlf 9-21 / chat 17-21<br>
28. dec.: Tlf 9-21 / chat lukket<br>
29. dec.: Tlf 9-21 / chat 9-15 &amp; 17-21<br>
30. dec.: Tlf 9-17 / chat 9-14`
        },
        {
            startDate: '2023-04-05',
            endDate: '2023-04-10',
            title: 'NB: Lukket i påsken',
            excerpt: 'Telefonen og chatten holder lukket fra 6. april til og med 10. april.'
        },
        {
            startDate: '2023-05-04',
            endDate: '2023-05-05',
            title: 'NB: Lukket Store Bededag',
            excerpt: 'Telefonen og chatten holder lukket 5. maj.'
        },
        {
            startDate: '2023-05-17',
            endDate: '2023-05-18',
            title: 'NB: Lukket Kristi Himmelfartsdag',
            excerpt: 'Telefonen og chatten holder lukket 18. maj.'
        },
        {
            startDate: '2023-05-26',
            endDate: '2023-05-29',
            title: 'NB: Lukket 2. Pinsedag',
            excerpt: 'Telefonen og chatten holder lukket 29. maj.'
        },
        {
            startDate: '2023-12-22',
            endDate: '2023-01-01',
            title: 'NB: Vi holder lukket mellem jul og nytår',
            excerpt: 'Vi åbner igen den 2. januar.'
        },
        {
            startDate: '2024-03-27',
            endDate: '2024-04-01',
            title: 'NB: Lukket i påsken',
            excerpt: 'Telefonen og chatten holder lukket fra 28. marts til og med 1. april.'
        },
        {
            startDate: '2024-04-25',
            endDate: '2024-04-26',
            title: 'NB: Lukket Store Bededag',
            excerpt: 'Telefonen og chatten holder lukket 26. april.'
        },
        {
            startDate: '2024-05-08',
            endDate: '2024-05-09',
            title: 'NB: Lukket Kristi Himmelfartsdag',
            excerpt: 'Telefonen og chatten holder lukket 9. maj.'
        },
        {
            startDate: '2024-05-17',
            endDate: '2024-05-20',
            title: 'NB: Lukket 2. Pinsedag',
            excerpt: 'Telefonen og chatten holder lukket 20. maj.'
        },
        {
            startDate: '2024-06-04',
            endDate: '2024-06-05',
            title: 'NB: Lukket Grundlovsdag',
            excerpt: 'Telefonen og chatten holder lukket 5. juni.'
        },
        {
            startDate: '2024-12-24',
            endDate: '2024-12-26',
            title: 'NB: Lukket i juledagene',
            excerpt: 'Telefonen og chatten holder lukket 25. og 26. december.'
        },
    ]);
});