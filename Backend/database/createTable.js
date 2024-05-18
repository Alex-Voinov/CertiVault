const pool = require('./dbConfig');

let isPoolEnded = false;

const endPool = () => {
  if (!isPoolEnded) {
    pool.end();
    isPoolEnded = true;
  }
};

const createUserTableQuery = `
  CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    surName VARCHAR(20) NOT NULL,
    login VARCHAR(20) UNIQUE NOT NULL, 
    password VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    accessToken TEXT,
    refreshToken TEXT,
    isActivate BOOLEAN DEFAULT FALSE,
    linkActivate VARCHAR DEFAULT ''
  )
`;

const createJwtTableQuery = `
  CREATE TABLE IF NOT EXISTS "jwt" (
    login VARCHAR PRIMARY KEY,
    accesstoken VARCHAR NOT NULL,
    refreshtoken VARCHAR NOT NULL,
    FOREIGN KEY (login) REFERENCES "user" (login)
  )
`;

const createTables = async () => {
  try {
    await pool.query(createUserTableQuery);
    console.log('Таблица "user" успешно создана');
  } catch (err) {
    console.error('Ошибка при создании таблицы "user":', err);
    endPool(); // Закрыть соединение с базой данных в случае ошибки
  }

  try {
    await pool.query(createJwtTableQuery);
    console.log('Таблица "jwt" успешно создана');
  } catch (err) {
    console.error('Ошибка при создании таблицы "jwt":', err);
    endPool(); // Закрыть соединение с базой данных в случае ошибки
  }
};

createTables();

