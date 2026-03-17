const Attraction = require('../models/Attraction');

const gen = (propPath, status = 200) => async (req, res) => {
    try {
        const doc = await Attraction.findOne();
        if (!doc) return res.status(404).json({ success: false, error: 'Data not seeded' });

        const parts = propPath.split('.');
        let val = doc;
        for (const p of parts) {
            if (p === '') continue;
            if (val) val = val[p];
        }
        res.status(status).json(val);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const getAttractionsPage = gen('');
const getAttractionsHero = gen('hero');
const getAttractionsHeroText = gen('hero.text');

const getAttractionsDetails = gen('rideDetails');
const getAttractionsDetailsText = gen('rideDetails.text');
const getAttractionsList = gen('rideDetails.list');

const getAttractionsSafety = gen('safetySection');
const getAttractionsSafetyTitle = gen('safetySection.title');
const getAttractionsSafetySubtitle = gen('safetySection.subtitle');
const getAttractionsSafetyRules = gen('safetySection.rules');

const getAttractionsCta = gen('cta');
const getAttractionsCtaButton = gen('cta.buttonLabel');
const getAttractionsCtaUrl = gen('cta.url');

module.exports = {
    getAttractionsPage,
    getAttractionsHero, getAttractionsHeroText,
    getAttractionsDetails, getAttractionsDetailsText, getAttractionsList,
    getAttractionsSafety, getAttractionsSafetyTitle, getAttractionsSafetySubtitle, getAttractionsSafetyRules,
    getAttractionsCta, getAttractionsCtaButton, getAttractionsCtaUrl
};
