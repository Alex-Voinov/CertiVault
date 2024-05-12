const pool = require('../database/dbConfig');

class DataBaseController {
    async get_all_login(req, res) {
        const getAllLoginsQuery = `
            SELECT login
            FROM "user";
        `;
        try {
            const { rows } = await pool.query(getAllLoginsQuery);
            res.json(rows.map(row => row.name));
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Ошибка сервера' });
        }
    }
}

module.exports = new DataBaseController();