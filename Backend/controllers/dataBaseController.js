const pool = require('../database/dbConfig');
const CryptoJS = require("crypto-js");
const tokenServise = require('../servise/tokenService');
const mailService = require('../servise/mailService');


class DataBaseController {
    async get_all_login(req, res) {
        const getAllLoginsQuery = `
            SELECT login
            FROM "user";
        `;
        try {
            const { rows } = await pool.query(getAllLoginsQuery);
            res.json(rows.map(row => row.login));
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Ошибка сервера' });
        }
    }
    async createUser(req, res) {
        try {
            const { name, surName, login, password, email } = req.query;
            if (!(name && surName && login && password && email)) throw new Error('Не корректно заполненные поля');
            const checkExistingUserQuery = `
    SELECT login, email
    FROM "user"
    WHERE login = $1 OR email = $2;
`;
            const { rows } = await pool.query(checkExistingUserQuery, [login, email]);
            if (rows.length > 0) {
                const existingUser = rows[0];
                if (existingUser.login === login) {
                    throw new Error('Пользователь с таким логином уже существует');
                } else {
                    throw new Error('Пользователь с такой почтой уже существует');
                }
            }
            const regex = /^[a-zA-Zа-яА-Я\s]+$/;
            if (!(regex.test(name) && regex.test(surName) && name.length <= 20 && surName.length <= 20 && login.length <= 20)) throw new Error('Не корректно заполненные поля');
            const hashPass = CryptoJS.SHA256(password).toString();
            const hashLogin = CryptoJS.SHA256(login).toString();
            const createUserQuery = `
        INSERT INTO "user" (name, surname, login, password, email, accessToken, refreshToken, linkactivate)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
    `;
            const {accessToken, refreshToken} = tokenServise.generateTokens({name, surName, login, email});
            await mailService.sendActivationMail(email, hashLogin)
            await pool.query(createUserQuery, [name, surName, login, hashPass, email, accessToken, refreshToken, hashLogin]);
            res.status(200);
        } catch (error) {
            res.status(400).json({ message: error.message });
            console.log(error)
        }
    }
}

module.exports = new DataBaseController();