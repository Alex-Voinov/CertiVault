export const defineTimeInterval = () => {
    const date = new Date();
    const hours = date.getHours();
    if (hours < 6) return 'Доброй ночи'
    if (hours < 12) return 'Доброе утро'
    if (hours < 18) return 'Добрый день'
    return 'Добрый вечер'
}

export const curentTimeDMY = () => {
    const date = new Date();
    return `${date.getDate()}.${date.getDate()}.${date.getFullYear()}`;
}