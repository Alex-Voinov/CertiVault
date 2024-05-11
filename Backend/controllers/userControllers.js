const multer = require('multer');

const storageSigFiles = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/sigFiles'); // Folder to save files
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Keep the original file name
    }
});

const uploadStorageSigFiles = multer({ storage: storageSigFiles }).single('file');

class UserController {
    async getSigFiels(req, res, next) {
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
}

module.exports = new UserController();