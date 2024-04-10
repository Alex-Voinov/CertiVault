export const  replaceElementAtIndex = (a, i, v) => {
    // Разделяем массив на две части: до индекса i и после индекса i
    const firstPart = a.slice(0, i);
    const secondPart = a.slice(i + 1);

    // Объединяем две части с новым значением v в середине
    const newArray = firstPart.concat(v, secondPart);

    return newArray;
}