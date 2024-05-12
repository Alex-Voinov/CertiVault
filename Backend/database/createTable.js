const pool = require('./dbConfig');

const createUserTableQuery = `
  CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    surName VARCHAR(20) NOT NULL,
    login VARCHAR(20) NOT NULL,
    password VARCHAR NOT NULL,
    accessToken TEXT,
    refreshToken TEXT
  )
`;

pool.query(createUserTableQuery)
    .then((res) => {
        console.log('Таблица "user" успешно создана');
    })
    .catch((err) => {
        console.error('Ошибка при создании таблицы "user":', err);
        pool.end(); // Закрыть соединение с базой данных в случае ошибки
    });