const multer = require('multer');
const sigResolution = require('../middlewere/sigResolution');
const dataBaseController = require('./dataBaseController');


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
            const {name, surname, accesstoken, refreshtoken} = user;
            const redirectURL = `${process.env.CLIENT_URL}/successful_email_confirmation/?name=${name}&surName=${surname}&accessToken=${accesstoken}&refreshToken=${refreshtoken}`;
            return res.redirect(redirectURL)
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = new UserController();