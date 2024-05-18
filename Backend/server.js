const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./router')
const cookieParser = require('cookie-parser');

const corsOptions = {
    origin: 'http://localhost:3001',
    credentials: true,
};


const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api', router);

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: 'Unauthorized' });
    }
});

const PORT =  3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
