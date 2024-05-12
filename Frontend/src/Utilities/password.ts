export const checkPassword = (password: string): string => {
    if (password.length < 10) {
        return "Минимальная длина пароля - 10 символов";
    } else if (password.length > 30) {
        return "Максимальная длина пароля - 30 символов";
    }

    if (!/\d/.test(password)) {
        return "Отсутствуют цифры в пароле";
    }
    if (!/[a-z]/.test(password)) {
        return "Отсутствуют строчные буквы в пароле";
    }
    if (!/[A-Z]/.test(password)) {
        return "Отсутствуют прописные буквы в пароле";
    }
    if (!/[!@#$%^&*()\-_=+{};:,<.>]/.test(password)) {
        return "Отсутствуют специальные символы в пароле";
    }

    // Проверка на наличие запрещенных символов
    const forbiddenChars = password.match(/[^a-zA-Z0-9!@#$%^&*()\-_=+{};:,<.>]/g);
    if (forbiddenChars) {
        return `Обнаружены запрещенные символы: ${forbiddenChars.join('')}`;
    }

    // Все проверки пройдены
    return "";
}

export default checkPassword;