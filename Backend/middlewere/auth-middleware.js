const tokenService = require("../servise/tokenService");

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            throw new Error('Отсутсвуют заголовки запроса');
        }
        const accsessToken = authorizationHeader.split(' ')[1];
        if (!accsessToken) {
            throw new Error('Отсутствует токен доступа');
        }
        const userData = tokenService.validateAccessToken(accsessToken);
        if (!userData) {
            throw new Error('Не зарегестрированный пользователь');
        }
        req.user = userData;
        next();

    } catch (error) {
        res.status(401).send({ message: error.message })
    }
};