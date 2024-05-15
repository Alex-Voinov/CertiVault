const userControllers = require('./controllers/userControllers');
const dataBaseController = require('./controllers/dataBaseController');
const Router = require('express').Router;
const router = new Router();


router.get('/get_uniqe_data',  dataBaseController.getUniqeData)
router.post('/create_user', dataBaseController.createUser)
router.post('/edit_email', dataBaseController.editEmail)
router.post('/get_sig_fiels',  userControllers.getSigFiels)


module.exports = router