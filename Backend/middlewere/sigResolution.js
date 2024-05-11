const path = require('path');

function sigResolution(req, file, cb) {
    const ext = path.extname(file.originalname);
    if (ext !== '.sig') {
        return cb(new Error('Only .sig files are allowed'));
    }
    cb(null, true);
}

module.exports = sigResolution;