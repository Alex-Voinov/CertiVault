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
            const { name, surName, password, login } = req.body;
            const email = req.body.email.toLowerCase();
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
            const activateLink = CryptoJS.SHA256(login + email).toString();
            const createUserQuery = `
        INSERT INTO "user" (name, surname, login, password, email, accessToken, refreshToken, linkactivate)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
    `;
            const { accessToken, refreshToken } = tokenServise.generateTokens({ name, surName, login, email });
            await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activateLink}`, name, surName);
            await pool.query(createUserQuery, [name, surName, login, hashPass, email, accessToken, refreshToken, activateLink]);
            const createJWTQuery = `
            INSERT INTO "jwt" (login, accesstoken, refreshtoken)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
            await pool.query(createJWTQuery, [login, accessToken, refreshToken])
            res.status(200).send("User created successfully");
        } catch (error) {
            res.status(400).json({ message: error.message });
            console.log(error)
        }
    }

    async editEmail(req, res) {
        try {
            const { login, hashPas } = req.body;
            const email = req.body.email.toLowerCase();
            const query = `
            UPDATE "user"
            SET email = $2,
            linkActivate = $4
            WHERE login = $1
              AND isactivate = false
              AND password = $3
            RETURNING *;
          `;
            const result = await pool.query(query, [login, email, hashPas, CryptoJS.SHA256(login + email).toString()]);
            if (result.rowCount > 0) {
                await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${CryptoJS.SHA256(login + email).toString()}`, result.rows[0].name, result.rows[0].surname)
                res.status(200).send("Email edit successfully");
            } else {
                throw new Error('Пользователь с указанным логином не найден или уже активирован');
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
            console.error('Ошибка при обновлении почты пользователя:', error);
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

    async findRefreshToken(refreshToken) {
        try {
            const result = await pool.query(
                `SELECT accesstoken, refreshtoken
            FROM "jwt"
            WHERE refreshtoken = $1;`,
                [refreshToken]
            );
            if (result.rows.length > 0) {
                const jwtRow = result.rows[0];
                return jwtRow;
            }
            throw new Error('Токен не найден')
        } catch (error) {
            console.error(error);
            return null
        }
    }

    async checkConfirmEmail(login, password) {
        try {
            // Поиск пользователя по ссылке активации
            const result = await pool.query(
                `SELECT accesstoken, refreshtoken, isactivate
                FROM "user"
                WHERE login = $1 AND password = $2;`,
                [login, password]
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
        const result = await pool.query(
            `SELECT name, surname, login, email, isactivate
            FROM "user"
            WHERE (login = $1 OR email = $2) AND password = $3;`,
            [logOrEmail, logOrEmail.toLowerCase(), CryptoJS.SHA256(password).toString()]
        );
        if (!result.rows.length > 0) throw new Error('Пользователь не найден')
        const { email, login, name, surname, isactivate } = result.rows[0];
        const { accessToken, refreshToken } = tokenServise.generateTokens({ email, login, name, surname });
        await this.saveRefreshToken(login, refreshToken);
        await this.saveAccessToken(login, accessToken);
        return { email, login, name, surName: surname, accessToken, refreshToken, isactivate };
    }

    async findUserByLogin(login) {
        try {
            const result = await pool.query(
                `SELECT accesstoken, refreshtoken, name, surname, login, email
            FROM "user"
            WHERE login = $1`,
                [login]
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

    async saveRefreshToken(login, refreshToken) {
        try {
            const updateJWTTable = await pool.query(
                `UPDATE "jwt"
               SET refreshtoken = $2
               WHERE login = $1
               RETURNING *;`,
                [login, refreshToken]
            );
            if (!(updateJWTTable.rows.length > 0)) throw new Error('Рефреш токен не найден')
            const updateUserTable = await pool.query(
                `UPDATE "user"
                   SET refreshtoken = $2
                   WHERE login = $1
                   RETURNING *;`,
                [login, refreshToken]
            );
            if (!(updateUserTable.rows.length > 0)) throw new Error('Пользователь с рефреш токеном не найден')
        } catch (error) {
            // Обработка ошибок
            console.error(error);
            throw error;
        }
    }

    async saveAccessToken(login, accessToken) {
        try {
            const updateJWTTable = await pool.query(
                `UPDATE "jwt"
               SET accesstoken = $2
               WHERE login = $1
               RETURNING *;`,
                [login, accessToken]
            );
            if (!(updateJWTTable.rows.length > 0)) throw new Error('токен доступа не найден')
            const updateUserTable = await pool.query(
                `UPDATE "user"
                   SET accesstoken = $2
                   WHERE login = $1
                   RETURNING *;`,
                [login, accessToken]
            );
            if (!(updateUserTable.rows.length > 0)) throw new Error('Пользователь с токеном доступа не найден')
        } catch (error) {
            // Обработка ошибок
            console.error(error);
            throw error;
        }
    }
    async addSig(login, name) {
        const queryText = `
      INSERT INTO "sig" (login, name)
      VALUES  ($1, $2)
      RETURNING id;
    `;
        const res = await pool.query(queryText, [login, name]);
        return `${login}-${res.rows[0].id}-${name}`
    }

    async getAllSignNames(req, res) {
        try {
            const { user } = req;
            if (!user) throw new Error('Не авторизованный пользователь пытается получить sig-данные.')
            const queryText = `
        SELECT name
        FROM "sig"
        WHERE login = $1`
            const findName = await pool.query(queryText, [user.login]);
            res.status(200).send(findName)
        } catch (er) {
            res.status(404).message(er.message)
        }
    }
}

module.exports = new DataBaseController();