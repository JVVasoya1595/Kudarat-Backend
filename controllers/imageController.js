const { decryptImageUrl } = require('../utils/imageToken');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const KEY = process.env.ENCRYPTION_KEY || '12345678901234567890123456789012';

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

const serveImage = (req, res, next) => {
    const segments = req.path.split('/');
    const token = segments[segments.length - 1];

    if (!token) {
        return next ? next() : res.status(400).json({ success: false, error: 'Token missing' });
    }

    const realUrl = decryptImageUrl(token);
    if (!realUrl) {
        return next ? next() : res.status(400).json({ success: false, error: 'Invalid token' });
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
        let ext = path.extname(localPath).toLowerCase();
        
        if (ext === '.enc') {
            const originalExt = path.extname(localPath.slice(0, -4)).toLowerCase();
            res.setHeader('Content-Type', MEDIA_MIME[originalExt] || 'application/octet-stream');
            
            const fileStream = fs.createReadStream(localPath);
            let ivRead = false;
            let decipher = null;
            let remainingIvBytes = 16;
            let ivBuffer = Buffer.alloc(0);
            
            fileStream.on('data', (chunk) => {
                if (!ivRead) {
                    const bytesNeeded = 16 - ivBuffer.length;
                    const ivPart = chunk.subarray(0, bytesNeeded);
                    ivBuffer = Buffer.concat([ivBuffer, ivPart]);
                    
                    if (ivBuffer.length === 16) {
                        ivRead = true;
                        const keyBuffer = KEY.length === 64 ? Buffer.from(KEY, 'hex') : Buffer.from(KEY);
                        decipher = crypto.createDecipheriv('aes-256-cbc', keyBuffer, ivBuffer);
                        decipher.on('error', (err) => {
                            console.error('Decryption error:', err);
                            res.end();
                        });
                        
                        const remainingChunk = chunk.subarray(bytesNeeded);
                        if (remainingChunk.length > 0) {
                            res.write(decipher.update(remainingChunk));
                        }
                    }
                } else if (decipher) {
                    res.write(decipher.update(chunk));
                }
            });
            
            fileStream.on('end', () => {
                if (decipher) {
                    try {
                        res.end(decipher.final());
                    } catch (err) {
                        res.end();
                    }
                } else {
                    res.end();
                }
            });
            
            fileStream.on('error', (err) => {
                res.status(500).json({ success: false, error: 'File read error' });
            });
            
            return;
        }

        res.setHeader('Content-Type', MEDIA_MIME[ext] || 'application/octet-stream');
        return fs.createReadStream(localPath).pipe(res);
    }

    if (next) return next();
    res.status(404).json({ success: false, error: 'File not found' });
};

module.exports = { serveImage };
