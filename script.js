mobiscroll.settings = {
    theme: 'ios'
};

var booked = [],
    invalid = ['w1'],
    now = new Date(),
    min = new Date(now.getFullYear(), now.getMonth(), now.getDate()),
    max = new Date(now.getFullYear(), now.getMonth() + 6, now.getDate()),
    firstMonth = generateMonthEvents(now.getFullYear(), now.getMonth());

booked = firstMonth.labels;
invalid = invalid.concat(firstMonth.invalid);

instance = mobiscroll.calendar('#demo', {
    display: 'inline',
    controls: ['calendar'],
    min: min,
    max: max,
    invalid: ['w1'],
    labels: booked,
    onPageLoading: function (event, inst) {
        var newItems,
            year = event.firstDay.getFullYear(),
            month = event.firstDay.getMonth(),
            isEventsLoaded = (inst.settings.labels).filter(function (v) {
                return v.d.getMonth() == month + 1;
            }).length;

        if (!isEventsLoaded) {
            newItems = generateMonthEvents(year, month + 1);
            inst.settings.labels = inst.settings.labels.concat(newItems.labels);
            inst.settings.invalid = inst.settings.invalid.concat(newItems.invalid);
        }
    }
});

function getRandomDay() {
    return Math.floor(Math.random() * 100) % 28 + 1;
}

function generateMonthEvents(year, month) {
    var isDisabled,
        tempDay,
        invalid = [],
        events = [],
        disabledDays = [getRandomDay(), getRandomDay(), getRandomDay(), getRandomDay()];

    for (var i = 1; i <= new Date(year, month + 1, 0).getDate(); ++i) {
        tempDay = new Date(year, month, i, now.getHours(), now.getSeconds());
        if (tempDay.getTime() >= now.getTime() && tempDay.getTime() <= max.getTime()) {
            isDisabled = disabledDays.indexOf(i) !== -1 || tempDay.getDay() == 1;
            if (isDisabled) {
                invalid.push(tempDay);
            }
            events.push({
                d: tempDay,
                text: isDisabled ? (tempDay.getDay() == 1 ? 'CLOSED' : 'FULL') : Math.round(Math.random() * 10) % 5 + 2 + ' SPOTS',
                color: isDisabled ? '#ccc' : '#8ada8a'
            });
        }
    }

    return {
        labels: events,
        invalid: invalid
    };
}