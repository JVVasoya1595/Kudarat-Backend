const express = require('express');
const {
    getAttractionsPage,
    getAttractionsHero, getAttractionsHeroText,
    getAttractionsDetails, getAttractionsDetailsText, getAttractionsList,
    getAttractionsSafety, getAttractionsSafetyTitle, getAttractionsSafetySubtitle, getAttractionsSafetyRules,
    getAttractionsCta, getAttractionsCtaButton, getAttractionsCtaUrl
} = require('../controllers/attractionsController');

const router = express.Router();

router.get('/', getAttractionsPage);

router.get('/hero', getAttractionsHero);
router.get('/hero/text', getAttractionsHeroText);

router.get('/details', getAttractionsDetails);
router.get('/details/text', getAttractionsDetailsText);
router.get('/list', getAttractionsList); // Preserve old list route

router.get('/safety', getAttractionsSafety);
router.get('/safety/title', getAttractionsSafetyTitle);
router.get('/safety/subtitle', getAttractionsSafetySubtitle);
router.get('/safety/rules', getAttractionsSafetyRules);

router.get('/cta', getAttractionsCta);
router.get('/cta/buttonLabel', getAttractionsCtaButton);
router.get('/cta/url', getAttractionsCtaUrl);

module.exports = router;
