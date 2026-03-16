const { decryptImageUrl } = require('../utils/imageToken');
const path = require('path');
const fs = require('fs');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

const MEDIA_MIME = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.avif': 'image/avif',
    '.ico': 'image/x-icon',
    '.mp4': 'video/mp4',
};

const serveImage = (req, res) => {
    const segments = req.path.split('/');
    const token = segments[segments.length - 1];

    if (!token) {
        return res.status(400).json({ success: false, error: 'Token missing' });
    }

    const realUrl = decryptImageUrl(token);
    if (!realUrl) {
        return res.status(400).json({ success: false, error: 'Invalid token' });
    }

    // Check if it's a local file path
    let pathname = realUrl;
    try {
        if (realUrl.startsWith('http')) {
            pathname = new URL(realUrl).pathname;
        }
    } catch (e) {}

    const cleanPath = decodeURIComponent(pathname).split('?')[0];
    const relativePath = cleanPath.replace(/^\/+/, '');
    const localPath = path.join(PUBLIC_DIR, relativePath);

    if (fs.existsSync(localPath)) {
        const ext = path.extname(localPath).toLowerCase();
        res.setHeader('Content-Type', MEDIA_MIME[ext] || 'application/octet-stream');
        return fs.createReadStream(localPath).pipe(res);
    }

    res.status(404).json({ success: false, error: 'File not found' });
};

module.exports = { serveImage };
