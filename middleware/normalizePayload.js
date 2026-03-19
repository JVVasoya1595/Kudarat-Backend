/**
 * normalizePayload.js
 * Automatically flattens nested structural objects sent by frontend admin UI
 * into the root of req.body so that our flat-destructuring controllers 
 * natively capture them.
 */
const normalizePayloadMiddleware = (req, res, next) => {
    if (!req.body) {
        req.body = {};
    }

    if (req.body && typeof req.body === 'object') {
        
        // If the payload specifically wraps its own entity
        // e.g. PUT /home/hero sends { hero: { text: {...}, background: [...] } }
        // We hoist the inner entity out first if there are no top-level keys matching our targets
        const possibleRoots = ['hero', 'premiumFacilities', 'signatureRides', 'pricing', 'gallery', 'location', 'story', 'features', 'support', 'bookingForm', 'rideDetails', 'safetySection', 'cta', 'contactInfo', 'messageForm', 'rules'];
        
        for (const root of possibleRoots) {
            if (req.body[root] && typeof req.body[root] === 'object') {
                // If it looks like they wrapped the entire payload in the namespace
                Object.assign(req.body, req.body[root]);
            }
        }

        // Hoist common nested structs
        const hoistTargets = ['text', 'info', 'button', 'submitButton', 'summary', 'cta', 'data', 'payload'];
        
        for (const target of hoistTargets) {
            if (req.body[target] && typeof req.body[target] === 'object') {
                Object.assign(req.body, req.body[target]);
            }
        }
        
        // Hoist deeply nested specific known arrays/objects if passed explicitly
        if (req.body.fields && typeof req.body.fields === 'object') {
            if (!Array.isArray(req.body.fields)) {
                Object.assign(req.body, req.body.fields); // For things like date, ticketType inside fields
            }
        }
    }
    next();
};

module.exports = normalizePayloadMiddleware;
