const { decryptImageUrl } = require('../utils/imageToken');

const IMAGE_URL_FIELDS = new Set([
    'imageUrl', 'image', 'images', 'thumbnail', 'thumbnailUrl', 'poster', 'banner',
    'logo', 'logoUrl', 'avatar', 'backgroundImage',
    'coverImage', 'bgImage', 'backgroundUrl', 'patternUrl', 'videoUrl',
    'url', 'content', 'src', 'background'
]);

const decryptUrlString = (value) => {
    if (typeof value === 'string' && value.includes('/img/')) {
        try {
            const tokenSplit = value.split('/img/');
            if (tokenSplit.length === 2 && tokenSplit[1]) {
                const token = tokenSplit[1].split('?')[0]; // strip query params if any
                const decryptedFullUrl = decryptImageUrl(token);
                if (decryptedFullUrl) {
                    try {
                        const parsedUrl = new URL(decryptedFullUrl);
                        return parsedUrl.pathname; // returns relative path like /home/hero/bg.jpg
                    } catch (e) {
                        // If it's not a valid absolute URL after decryption, maybe it was a relative string inside the token
                        // Just ensure we return a clean relative path
                        return decryptedFullUrl.startsWith('http') ? decryptedFullUrl : decryptedFullUrl;
                    }
                }
            }
        } catch (err) {
            console.error('[ImageDecrypt] Error decrypting incoming token:', err.message);
        }
    }
    return value;
};

const decryptImagesInObject = (obj) => {
    if (typeof obj === 'string') {
        return decryptUrlString(obj);
    }

    if (Array.isArray(obj)) {
        return obj.map(item => decryptImagesInObject(item));
    }

    if (obj !== null && typeof obj === 'object') {
        const result = {};
        for (const [key, value] of Object.entries(obj)) {
            if (IMAGE_URL_FIELDS.has(key)) {
                if (typeof value === 'string') {
                    result[key] = decryptUrlString(value);
                    continue;
                } else if (Array.isArray(value)) {
                    result[key] = value.map(item => {
                        if (typeof item === 'string') return decryptUrlString(item);
                        return decryptImagesInObject(item);
                    });
                    continue;
                }
            }
            // Traverse normally
            result[key] = decryptImagesInObject(value);
        }
        return result;
    }

    return obj;
};

const imageDecryptMiddleware = (req, res, next) => {
    if (req.body && typeof req.body === 'object') {
        req.body = decryptImagesInObject(req.body);
    }
    next();
};

module.exports = imageDecryptMiddleware;
