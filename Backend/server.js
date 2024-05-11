const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./router')

const corsOptions = {
    origin: 'http://localhost:3001'
};



const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use('/api', router);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
