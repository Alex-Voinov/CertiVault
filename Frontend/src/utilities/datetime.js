export const getCurrentDate = () => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth(); // Месяцы в JavaScript начинаются с 0
    const year = currentDate.getFullYear();
    
    return [day, month, year];
}

const monthNames = [
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