const pool = require('./dbConfig');

let isPoolEnded = false;

const endPool = () => {
  if (!isPoolEnded) {
    pool.end();
    isPoolEnded = true;
  }
};

const createTableQueries = [
  {
    query: `
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
    `,
    name: 'user'
  },
  {
    query: `
      CREATE TABLE IF NOT EXISTS "jwt" (
        login VARCHAR PRIMARY KEY,
        accesstoken VARCHAR NOT NULL,
        refreshtoken VARCHAR NOT NULL,
        FOREIGN KEY (login) REFERENCES "user" (login)
      )
    `,
    name: 'jwt'
  },
  {
    query: `
      CREATE TABLE IF NOT EXISTS "sig" (
        id SERIAL PRIMARY KEY,
        login VARCHAR,
        name VARCHAR NOT NULL
      )
    `,
    name: 'sig'
  },
  {
    query: `
      CREATE TABLE IF NOT EXISTS "unloading" (
        username TEXT PRIMARY KEY,
        usage_count INTEGER DEFAULT 0,
        last_upload_date DATE
      )
    `,
    name: 'unloading'
  }
];

const createTables = async () => {
  try {
    for (const { query, name } of createTableQueries) {
      await pool.query(query);
      console.log(`Таблица "${name}" успешно создана`);
    }
  } catch (err) {
    console.error('Ошибка при создании таблицы:', err);
  } 
};

createTables();
