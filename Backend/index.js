const { Pool } = require('pg');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { generateDCC } = require('./handlers/post');


const corsOptions = {
    origin: 'http://localhost:3001'
};

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'maindb',
    password: 'Voinov2100)',
    port: 5432, // порт по умолчанию для PostgreSQL
});

// Проверяем соединение
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Ошибка при подключении к базе данных:', err);
    } else {
        console.log('Успешное подключение к базе данных');
        pool.query(`
    CREATE TABLE IF NOT EXISTS dcc (
        _id SERIAL PRIMARY KEY,
        county VARCHAR(40),
        userId VARCHAR(200),
        receiptDate DATE,
        perfomanceDate DATE,
        perfomanceLocation VARCHAR(200),
        issueData DATE,
        endPerfomanceDate DATE,
        denomination VARCHAR(200),
        LibMail VARCHAR(200),
        libPhone VARCHAR(40),
        libFax VARCHAR(200),
        libPostalCode VARCHAR(200),
        libCity VARCHAR(200),
        libStreet VARCHAR(200),
        libStreetNumber VARCHAR(200),
        libState VARCHAR(200),
        libCounty VARCHAR(200),
        сustomerName VARCHAR(200),
        сustomerMail VARCHAR(200),
        сustomerTel VARCHAR(200),
        сustomerFax VARCHAR(200),
        сustomerPoastalCode VARCHAR(200),
        сustomerCity VARCHAR(200),
        сustomerStreet VARCHAR(200),
        сustomerStreetNumber VARCHAR(200),
        сustomerState VARCHAR(200),
        сustomerCounty VARCHAR(200)
    )
`, (err, res) => {
            if (err) {
                console.error('Ошибка при создании таблицы:', err);
            } else {
                console.log('Таблица успешно создана или уже существует');
            }
        });
    }
});




// Создание экземпляра приложения Express
const app = express();
app.use(cors(corsOptions));
// Парсер JSON-тела запроса
app.use(bodyParser.json());

// Обработчик для маршрута /path1
app.post('/api/repository-generate/', generateDCC);

// Обработчик для маршрута /path2
app.post('/path2', (req, res) => {
    // Ваша логика обработки запроса для маршрута /path2
    res.json({ message: 'Обработка запроса на /path2' });
});

// Обработчик для остальных маршрутов
app.use((req, res) => {
    res.status(404).json({ message: 'Маршрут не найден' });
});

// Запуск сервера на порту 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});