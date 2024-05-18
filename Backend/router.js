const userControllers = require('./controllers/userControllers');
const dataBaseController = require('./controllers/dataBaseController');
const authMiddleware = require('./middlewere/auth-middleware');
const Router = require('express').Router;
const router = new Router();

router.get('/refresh', userControllers.refresh);
router.get('/get_uniqe_data',  dataBaseController.getUniqeData)
router.get('/check_confirm_email',  userControllers.checkConfirmEmail)
router.get('/activate/:link', userControllers.activate);
router.get('/login', userControllers.login);
router.get('/verify', authMiddleware, userControllers.verify);

router.post('/create_user', dataBaseController.createUser)
router.post('/edit_email', dataBaseController.editEmail)
router.post('/get_sig_fiels',  userControllers.getSigFiels)


module.exports = router