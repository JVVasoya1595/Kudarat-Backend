const express = require('express');
const {
    getAttractionsPage,
    getAttractionsHero, getAttractionsHeroText, addAttractionsHero, updateAttractionsHero, deleteAttractionsHero,
    getAttractionsDetails, getAttractionsDetailsText, getAttractionsList, addAttractionsDetails, updateAttractionsDetails, deleteAttractionsDetails,
    getAttractionsSafety, getAttractionsSafetyTitle, getAttractionsSafetySubtitle, getAttractionsSafetyRules, addAttractionsSafety, updateAttractionsSafety, deleteAttractionsSafety,
    getAttractionsCta, getAttractionsCtaButton, getAttractionsCtaUrl, addAttractionsCta, updateAttractionsCta, deleteAttractionsCta
} = require('../controllers/attractionsController');

const router = express.Router();

router.get('/', getAttractionsPage);

router.get('/hero', getAttractionsHero);
router.post('/hero/add', addAttractionsHero);
router.put('/hero/update', updateAttractionsHero);
router.delete('/hero/delete', deleteAttractionsHero);
router.get('/hero/text', getAttractionsHeroText);

router.get('/details', getAttractionsDetails);
router.post('/details/add', addAttractionsDetails);
router.put('/details/update', updateAttractionsDetails);
router.delete('/details/delete', deleteAttractionsDetails);
router.get('/details/text', getAttractionsDetailsText);
router.get('/list', getAttractionsList); // Preserve old list route

router.get('/safety', getAttractionsSafety);
router.post('/safety/add', addAttractionsSafety);
router.put('/safety/update', updateAttractionsSafety);
router.delete('/safety/delete', deleteAttractionsSafety);
router.get('/safety/title', getAttractionsSafetyTitle);
router.get('/safety/subtitle', getAttractionsSafetySubtitle);
router.get('/safety/rules', getAttractionsSafetyRules);

router.get('/cta', getAttractionsCta);
router.post('/cta/add', addAttractionsCta);
router.put('/cta/update', updateAttractionsCta);
router.delete('/cta/delete', deleteAttractionsCta);
router.get('/cta/buttonLabel', getAttractionsCtaButton);
router.get('/cta/url', getAttractionsCtaUrl);

module.exports = router;
