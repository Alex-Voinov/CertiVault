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
    name: 'пользователей'
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
    name: 'токенов доступа'
  },
  {
    query: `
      CREATE TABLE IF NOT EXISTS "sig" (
        id SERIAL PRIMARY KEY,
        login VARCHAR,
        name VARCHAR NOT NULL
      )
    `,
    name: 'электронных подписей'
  },
  {
    query: `
      CREATE TABLE IF NOT EXISTS "comment" (
        id SERIAL PRIMARY KEY,
        login VARCHAR,
        name VARCHAR NOT NULL
      )
    `,
    name: 'файлов комментариев'
  },
  {
    query: `
      CREATE TABLE IF NOT EXISTS "unloading" (
        login TEXT PRIMARY KEY,
        usage_count INTEGER DEFAULT 0,
        last_upload_date DATE
      )
    `,
    name: 'лимитов загрузок'
  }
];

const createTables = async () => {
  let noException = true;
  try {
    for (const { query, name } of createTableQueries) {
      await pool.query(query);
      console.log(`База ${name} успешно загружена...`);
    }
  } catch (err) {
    console.error(`Ошибка при создании базы ${name}:`, err);
    noException = false;
  }
  if (noException) console.log('Сервер готов к работе.')
};

createTables();
