const { encryptImageUrl } = require('../utils/imageToken');

const IMAGE_URL_FIELDS = new Set([
    'imageUrl', 'image', 'images', 'thumbnail', 'thumbnailUrl', 'poster', 'banner',
    'logo', 'logoUrl', 'avatar', 'backgroundImage',
    'coverImage', 'bgImage', 'backgroundUrl', 'patternUrl', 'videoUrl',
    'url', 'content', 'src', 'background'
]);

const looksLikeImagePath = (value) => {
    if (typeof value !== 'string' || value.trim() === '') return false;
    const imageExtensions = /\.(png|jpe?g|gif|webp|svg|avif|bmp|ico|tiff?|mp4|webm|mov|m4v)(\?.*)?$/i;
    const isAbsoluteUrl = value.startsWith('http://') || value.startsWith('https://');
    const isRelativePath = value.startsWith('/') || value.startsWith('./') || value.startsWith('../');
    return (isAbsoluteUrl || isRelativePath) && imageExtensions.test(value);
};

const encryptImagesInObject = (obj, frontendOrigin, baseUrl) => {
    if (typeof obj === 'string' && looksLikeImagePath(obj)) {
        let fullUrl = obj;
        if (!obj.startsWith('http')) {
            fullUrl = `${baseUrl}${obj.startsWith('/') ? '' : '/'}${obj}`;
        }
        return encryptImageUrl(fullUrl);
    }

    if (Array.isArray(obj)) {
        return obj.map((item) => encryptImagesInObject(item, frontendOrigin, baseUrl));
    }

    if (obj !== null && typeof obj === 'object') {
        const result = {};
        for (const [key, value] of Object.entries(obj)) {
            if (IMAGE_URL_FIELDS.has(key)) {
                if (looksLikeImagePath(value)) {
                    let fullUrl = value;
                    if (!value.startsWith('http')) {
                        fullUrl = `${baseUrl}${value.startsWith('/') ? '' : '/'}${value}`;
                    }
                    result[key] = encryptImageUrl(fullUrl);
                    continue;
                } else if (Array.isArray(value)) {
                    result[key] = value.map((item) => {
                        if (typeof item === 'string' && looksLikeImagePath(item)) {
                            let fullUrl = item;
                            if (!item.startsWith('http')) {
                                fullUrl = `${baseUrl}${item.startsWith('/') ? '' : '/'}${item}`;
                            }
                            return encryptImageUrl(fullUrl);
                        }
                        return encryptImagesInObject(item, frontendOrigin, baseUrl);
                    });
                    continue;
                }
            }
            // Array fallback for mapping nested elements
            result[key] = Array.isArray(value) ? value.map((item) => encryptImagesInObject(item, frontendOrigin, baseUrl)) : encryptImagesInObject(value, frontendOrigin, baseUrl);
        }
        return result;
    }

    return obj;
};

const imageEncryptMiddleware = (req, res, next) => {
    const originalJson = res.json.bind(res);

    res.json = (body) => {
        try {
            if (body && typeof body === 'object') {
                body = JSON.parse(JSON.stringify(body));
                
                // Prioritize the actual request host so mobile devices see the local IP instead of localhost
                const reqHost = req.get('host');
                const baseUrl = reqHost ? `${req.protocol}://${reqHost}` : process.env.SERVER_URL;
                
                const frontendOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
                body = encryptImagesInObject(body, frontendOrigin, baseUrl);
            }
        } catch (err) {
            console.error('[ImageEncrypt] Error encrypting image URLs:', err.message);
        }
        return originalJson(body);
    };

    next();
};

module.exports = imageEncryptMiddleware;
