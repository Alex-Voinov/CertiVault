const pool = require('../database/dbConfig');
const CryptoJS = require("crypto-js");
const tokenServise = require('../servise/tokenService');
const mailService = require('../servise/mailService');


class DataBaseController {
    async getUniqeData(req, res) {
        const getAllLoginsQuery = `
            SELECT login, email
            FROM "user";
        `;
        try {
            const { rows } = await pool.query(getAllLoginsQuery);
            res.json(
                [
                    rows.map(row => CryptoJS.SHA256(row.login).toString()),
                    rows.map(row => CryptoJS.SHA256(row.email).toString()),
                ]
            );
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Ошибка сервера' });
        }
    }
    async createUser(req, res) {
        try {
            const { name, surName, email, login, password } = req.body;
            if (!(name && surName && login && password && email)) throw new Error('Некорректно заполненные поля');
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
            if (!(regex.test(name) && regex.test(surName) && name.length <= 20 && surName.length <= 20 && login.length <= 20)) throw new Error('Некорректно заполненные поля');
            const hashPass = CryptoJS.SHA256(password).toString();
            const hashLogin = CryptoJS.SHA256(login).toString();
            const createUserQuery = `
        INSERT INTO "user" (name, surname, login, password, email, accessToken, refreshToken, linkactivate)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
    `;
            const { accessToken, refreshToken } = tokenServise.generateTokens({ name, surName, login, email });
            await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${hashLogin}`)
            await pool.query(createUserQuery, [name, surName, login, hashPass, email, accessToken, refreshToken, hashLogin]);
            res.status(200).send("User created successfully");
        } catch (error) {
            res.status(400).json({ message: error.message });
            console.log(error)
        }
    }

    async editEmail(req, res) {
        try {
            const { login, password, email } = req.body;
            const query = `
            UPDATE "user"
            SET email = $2
            WHERE login = $1
              AND isactivate = false
              AND password = $3
            RETURNING *;
          `;
            const result = await pool.query(query, [login, email, CryptoJS.SHA256(password).toString()]);

            if (result.rowCount > 0) {
                await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${CryptoJS.SHA256(login).toString()}`)
                res.status(200).send("Email edit successfully");
            } else {
                throw new Error('Пользователь с указанным логином не найден или уже активирован');
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
            console.error('Ошибка при обновлении почты пользователя:', error);
            throw error;
        }
    }

    async activateUser(activationLink) {
        try {
            // Поиск пользователя по ссылке активации
            const result = await pool.query(
                `UPDATE "user"
               SET isActivate = TRUE,
                   linkActivate = ''
               WHERE linkActivate = $1
               RETURNING name, surName, accessToken, refreshToken;`,
                [activationLink]
            );

            // Если пользователь найден и обновлен успешно, вернуть его данные
            if (result.rows.length > 0) {
                const user = result.rows[0];
                return user;
            } else {
                // Если пользователь не найден
                return null;
            }
        } catch (error) {
            // Обработка ошибок
            console.error('Ошибка при поиске и обновлении пользователя:', error);
            throw error;
        }
    }

    async checkConfirmEmail(login, password) {
        try {
            // Поиск пользователя по ссылке активации
            const result = await pool.query(
                `SELECT accesstoken, refreshtoken, isactivate
                FROM "user"
                WHERE login = $1 AND password = $2;`,
                [login, CryptoJS.SHA256(password).toString()]
            );
            // Если пользователь найден и обновлен успешно, вернуть его данные
            if (result.rows.length > 0) {
                const user = result.rows[0];
                if (user.isactivate) return user;
                throw new Error('Почта ещё не активирована.')
            }

            throw new Error('По введеным данным пользователей в базе данных нет')
        } catch (error) {
            // Обработка ошибок
            console.error(error);
            throw error;
        }
    }

    async login(logOrEmail, password) {
        try {
            const result = await pool.query(
                `SELECT accesstoken, refreshtoken, name, surname, login, email
            FROM "user"
            WHERE (login = $1 OR email = $1) AND password = $2;`,
                [logOrEmail, CryptoJS.SHA256(password).toString()]
            );
            if (result.rows.length > 0) {
                const user = result.rows[0];
                return user; 
            }
            throw new Error('Пользователь не найден')
        } catch (error) {
            // Обработка ошибок
            console.error(error);
            throw error;
        }
    }

}

module.exports = new DataBaseController();