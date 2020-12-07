jQuery(function($) {
    /* DO NOT TOUCH */
    function getOpeningDayText(today, next) {
        if (today === next) {
            return 'kl:'
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
        return (day * 24 * 60) + (hours * 60) + minutes
    }

    function handleOpeningHours(id, config) {
        // Determine if we're open at the moment
        var tempDate = new Date()
        var currentDay = tempDate.getDay()
        var currentHours = tempDate.getHours()
        var currentMinutes = tempDate.getMinutes()
        var currentDayInMinutes = dayInMinutes(currentDay, currentHours, currentMinutes)

        var currentOpenHours = config.hours.find(function(c) {
            return (
                dayInMinutes(c.open.day, c.open.hours, c.open.minutes) <= currentDayInMinutes &&
                dayInMinutes(c.close.day, c.close.hours, c.close.minutes) > currentDayInMinutes
            )
        })
        var nextOpenHours = config.hours.find(function(c) {
            return dayInMinutes(c.open.day, c.open.hours, c.open.minutes) > currentDayInMinutes
        }) || config.hours[0]

        var element = $(id);

        if (currentOpenHours) {
            var closingHours = currentOpenHours.close.hours.toString()
            var closingMinutes = currentOpenHours.close.minutes.toString()
            closingMinutes = closingMinutes.length < 2 ? "0" + closingMinutes : closingMinutes
            var closingText = [closingHours, closingMinutes].join(':')

            element.find('.openingHours-topLine').html(config.openTopText.replace('$$', closingText)).addClass('openingHours-bigText');
            element.find('.openingHours-bottomLine').html(config.openBottomText.replace('$$', closingText));
            element.find('.openingHours-action').removeClass('openingHours-hidden');
        } else {
            var openingDay = getOpeningDayText(
                currentDay,
                nextOpenHours.open.day
            )

            var openingHours = nextOpenHours.open.hours.toString()
            var openingMinutes = nextOpenHours.open.minutes.toString()
            openingMinutes = openingMinutes.length < 2 ? "0" + openingMinutes : openingMinutes
            var openingText = [openingDay, [openingHours, openingMinutes].join(':')].join(' ')

            element.find('.openingHours-topLine').html(config.closedTopText.replace('$$', openingText));
            element.find('.openingHours-bottomLine').html(config.closedBottomText.replace('$$', openingText)).addClass('openingHours-bigText');
        }
    }

    /* NOW YOU CAN TOUCH */

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
            {open: {day: 1, hours: 12, minutes: 0}, close: {day: 1, hours: 15, minutes: 0}},
            {open: {day: 2, hours: 12, minutes: 0}, close: {day: 2, hours: 15, minutes: 0}},
            {open: {day: 4, hours: 12, minutes: 0}, close: {day: 4, hours: 15, minutes: 0}},
        ],
        openTopText: 'Vores chat er åben',
        openBottomText: 'Vi er klar til at chatte indtil kl. $$ i dag',
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
        ],
        openTopText: 'Vores telefoner er åbne',
        openBottomText: 'Vi er klar til at tale indtil kl. $$ i dag',
        closedTopText: 'Telefonerne er lukkede. Vi åbner igen',
        closedBottomText: '$$'
    });
});