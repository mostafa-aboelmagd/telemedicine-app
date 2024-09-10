const database = require('../../../Database/Patient/Medical Document/Upload');
const multer = require('multer');
const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage: storage }).array('files');

const upload = async (req, res) => {
    uploadMiddleware(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: 'File upload failed', error: err.message });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        try {
            for (const file of req.files) {
                const fileName = file.originalname;
                const fileType = file.mimetype;
                const fileData = file.buffer;

                await database.saveFile(fileName, fileType, fileData);
            }

            return res.status(200).json({ message: 'Files uploaded and stored successfully' });
        } catch (error) {
            console.error('Error processing files:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    });
};


module.exports = { upload };