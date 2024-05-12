const userControllers = require('./controllers/userControllers');
const dataBaseController = require('./controllers/dataBaseController');
const Router = require('express').Router;
const router = new Router();


router.get('/get_all_login',  dataBaseController.get_all_login)
router.get('/create_user', dataBaseController.createUser)
router.post('/get_sig_fiels',  userControllers.getSigFiels)


module.exports = router