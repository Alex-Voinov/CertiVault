export const getCurrentDate = () => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth(); // Месяцы в JavaScript начинаются с 0
    const year = currentDate.getFullYear();

    return [day, month, year];
}
export const weekdaysShort = [
    'Пн',
    'Вт',
    'Ср',
    'Чт',
    'Пт',
    'Сб',
    'Вс',
]

export const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь"
];

export const monthNamesByNumber = (number) => {
    return monthNames[number];
}

function getLastWeekOfPreviousMonth(month, year) {
    // Получаем количество дней в предыдущем месяце
    let lastDayOfPreviousMonth = new Date(year, month - 2, 0).getDate();
    // Формируем массив дат последней недели
    let lastWeekDates = [];
    for (let i = lastDayOfPreviousMonth - 6; i <= lastDayOfPreviousMonth; i++) {
        lastWeekDates.push(i);
    }
    return lastWeekDates;
}

export const generateCalendar = (year, month) => {
    const weeks = [];
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    let currentDate = new Date(startDate);
    let currentWeek = [];

    const startDay = startDate.getDay();
    const prevMonthEndDate = new Date(year, month, 0).getDate();
    const firstDay = 1 + (startDay === 0 ? -6 : -startDay + 1); // Первый день текущего месяца
    //console.log(getLastWeekOfPreviousMonth(4, 24))
    //console.log(month, year)
    // Добавляем дни предыдущего месяца в начало массива, если нужно
    if (startDay === 1) {
        weeks.push(getLastWeekOfPreviousMonth(month, year));
    }
    currentWeek = [];
    for (let i = firstDay; i <= 0; i++) {
        currentWeek.push(prevMonthEndDate + i);
    }
    //weeks.push(currentWeek);
    // Заполняем массив датами текущего месяца
    while (currentDate <= endDate) {
        if (currentWeek.length === 7) {
            weeks.push([...currentWeek]);
            currentWeek = [];
        }
        currentWeek.push(currentDate.getDate());
        currentDate.setDate(currentDate.getDate() + 1);
    }

    // Добавляем дни следующего месяца в конец массива
    let nextMonthDay = 1;
    while (currentWeek.length < 7) {
        currentWeek.push(nextMonthDay);
        nextMonthDay++;
    }

    weeks.push([...currentWeek]);

    if (weeks.length < 6) {
        const lastDay = weeks[4][6];
        if (lastDay > 7) {
            weeks.push([1, 2, 3, 4, 5, 6, 7]);
        } else {
            const currentWeek = []
            for (let i = lastDay + 1; i < lastDay + 8; i++) {
                currentWeek.push(i);
            }
            weeks.push(currentWeek);
        }
    }

    return weeks;
}

