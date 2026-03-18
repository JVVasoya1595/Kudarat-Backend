const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const KEY = process.env.ENCRYPTION_KEY || '12345678901234567890123456789012';

// 1. Storage config for multer
// We'll write to a temporary file first, then encrypt it, or use stream directly.
// To keep things simple and avoid memory overhead, we'll write temp file, encrypt, delete temp.
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '..', 'public', 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext).replace(/\s+/g, '-');
        cb(null, `${name}-${Date.now()}-temp${ext}`);
    }
});

const uploadParams = multer({ storage });

const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: 'No file uploaded' });
        }

        const tempPath = req.file.path;
        
        // Define the final encrypted path
        // For example: image-12345.jpg.enc
        const finalFilename = req.file.filename.replace('-temp', '') + '.enc';
        const finalPath = path.join(req.file.destination, finalFilename);

        // Encrypt the file
        const iv = crypto.randomBytes(16);
        const keyBuffer = KEY.length === 64 ? Buffer.from(KEY, 'hex') : Buffer.from(KEY);
        const cipher = crypto.createCipheriv('aes-256-cbc', keyBuffer, iv);

        const readStream = fs.createReadStream(tempPath);
        const writeStream = fs.createWriteStream(finalPath);

        // Prepend IV to the file
        writeStream.write(iv);

        readStream.pipe(cipher).pipe(writeStream);

        writeStream.on('finish', () => {
            // Remove the temporary unencrypted file
            fs.unlinkSync(tempPath);
            
            // Return the URL for the encrypted image
            // Note: The UI/database needs the path without the absolute disk part
            const relativeUrl = `/uploads/${finalFilename}`;

            // Because of imageEncryptMiddleware, any return field matched by IMAGE_URL_FIELDS
            // will automatically get URL-encrypted. So we just return the local relative string.
            res.status(200).json({
                success: true,
                imageUrl: relativeUrl, // this gets automatically mapped by middleware
                url: relativeUrl,
                message: 'Image uploaded successfully'
            });
        });

        writeStream.on('error', (err) => {
            fs.unlinkSync(tempPath);
            res.status(500).json({ success: false, error: 'Error encrypting file' });
        });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    upload: uploadParams,
    uploadFile
};
