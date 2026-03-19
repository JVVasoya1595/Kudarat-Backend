/**
 * normalizePayload.js
 * Automatically flattens nested structural objects sent by frontend admin UI
 * into the root of req.body so that our flat-destructuring controllers 
 * natively capture them.
 */
const normalizePayloadMiddleware = (req, res, next) => {
    // 1. Initialize req.body
    if (!req.body) req.body = {};

    // 2. Safely merge req.query for methods that often use it (DELETE, GET)
    // Only merge if the body doesn't already have conflicting keys
    if (req.method === 'DELETE' || req.method === 'GET') {
        for (const key in req.query) {
            if (req.body[key] === undefined) {
                req.body[key] = req.query[key];
            }
        }
    }

    // 3. Helper to cast strings to types (FormData/Query sends only strings)
    const castTypes = (obj) => {
        if (!obj || typeof obj !== 'object') return;
        for (const key in obj) {
            const val = obj[key];
            if (val === 'true') obj[key] = true;
            else if (val === 'false') obj[key] = false;
            else if (val === 'null') obj[key] = null;
            else if (typeof val === 'string' && val.trim() !== '' && !isNaN(val) && /^-?\d+(\.\d+)?$/.test(val)) {
                obj[key] = Number(val);
            } else if (typeof val === 'object' && val !== null) {
                castTypes(val);
            }
        }
    };
    castTypes(req.body);

    // 4. Hoist nested entities if wrapped in their own name
    const possibleRoots = ['hero', 'premiumFacilities', 'signatureRides', 'pricing', 'gallery', 'location', 'story', 'features', 'support', 'bookingForm', 'rideDetails', 'safetySection', 'cta', 'contactInfo', 'messageForm', 'rules'];
    for (const root of possibleRoots) {
        if (req.body[root] && typeof req.body[root] === 'object' && !Array.isArray(req.body[root])) {
            Object.assign(req.body, req.body[root]);
        }
    }

    // 5. Hoist common sub-objects
    const hoistTargets = ['text', 'info', 'button', 'submitButton', 'summary', 'cta', 'data', 'payload'];
    for (const target of hoistTargets) {
        if (req.body[target] && typeof req.body[target] === 'object' && !Array.isArray(req.body[target])) {
            Object.assign(req.body, req.body[target]);
        }
    }

    // 6. Handle 'fields' array/object hoisting
    if (req.body.fields && typeof req.body.fields === 'object' && !Array.isArray(req.body.fields)) {
        Object.assign(req.body, req.body.fields);
    }

    next();
};

module.exports = normalizePayloadMiddleware;
