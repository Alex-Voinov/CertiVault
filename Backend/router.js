const userControllers = require('./controllers/userControllers');
const sigResolution = require('./middlewere/sigResolution')
const Router = require('express').Router;
const router = new Router();

router.post('/get_sig_fiels',  userControllers.getSigFiels)

module.exports = router