const multer = require('multer');
const sigResolution = require('../middlewere/sigResolution');
const dataBaseController = require('./dataBaseController');
const tokenService = require('../servise/tokenService');


const storageSigFiles = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/sigFiles'); // Folder to save files
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Keep the original file name
    }
});

const uploadStorageSigFiles = multer({ storage: storageSigFiles, fileFilter: sigResolution }).single('file');

class UserController {

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            if (!refreshToken) {
                throw new Error('Не получено токена для поиска');
            }
            const userData = tokenService.validateRefreshToken(refreshToken);
            const tokenFromDb = await dataBaseController.findRefreshToken(refreshToken);
            console.log(2222222222, tokenFromDb)
            if (!userData || !tokenFromDb) {
                throw new Error('Нет данных о токене или его подтверждения в базе данных');
            }
            const user = await dataBaseController.findUserByLogin(userData.login);
            const { email, login, name, surname } = user;
            const tokens = tokenService.generateTokens({ email, login, name, surname });
            await dataBaseController.saveRefreshToken(user.login, tokens.refreshToken);
            res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (error) {
            console.log(error)
            res.status(401).json({ message: error.message });
        }
    }

    async getSigFiels(req, res) {
        try {
            uploadStorageSigFiles(req, res, function (err) {
                if (err) {
                    // Handle error
                    console.log(err);
                    return res.status(400).json({ error: 'File upload failed' });
                }
                return res.status(200).json({ message: 'File uploaded successfully' });
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async activate(req, res) {
        try {
            const activationLink = req.params.link;
            const user = await dataBaseController.activateUser(activationLink);
            if (!user) {
                throw new Error('Неккоректная ссылка активации');
            }
            const { name, surname, accesstoken, refreshtoken } = user;
            const redirectURL = `${process.env.CLIENT_URL}/successful_email_confirmation/?name=${name}&surName=${surname}&accessToken=${accesstoken}&refreshToken=${refreshtoken}`;
            return res.redirect(redirectURL)
        } catch (error) {
            console.error(error);
        }
    }

    async checkConfirmEmail(req, res) {
        try {
            const { login, password } = req.query;
            const { accesstoken, refreshtoken } = await dataBaseController.checkConfirmEmail(login, password)
            res.status(200).json({
                accessToken: accesstoken,
                refreshToken: refreshtoken,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
            console.error('Ответ подтверждения', error);
        }
    }

    async login(req, res) {
        try {
            const { logOrEmail, password } = req.query;
            const { accessToken, refreshToken, name, surname, login, email } = await dataBaseController.login(logOrEmail, password)
            res.cookie('refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            res.status(200).json({
                refreshToken,
                accessToken,
                user: { name, surname, login, email }
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
            console.error('Ответ подтверждения', error);
        }
    }

    async verify(req, res) {
        try {
            console.log(1)
            const { user } = req;
            //console.log(user)
            const { name, surname, login, email } = user;
            console.log(12345, user)
            res.status(200).json({ name, surname, login, email });
        } catch (error) {
            res.status(401).json({ message: error.message });
            console.error('Не авторизованный пользователь', error);
        }
    }

}

module.exports = new UserController();