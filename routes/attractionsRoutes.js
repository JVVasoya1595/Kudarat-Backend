const express = require('express');
const {
    getAttractionsPage,
    getAttractionsHero, getAttractionsHeroText, addAttractionsHero, updateAttractionsHero, deleteAttractionsHero,
    getAttractionsDetails, getAttractionsDetailsText, getAttractionsList, addAttractionsDetails, updateAttractionsDetails, deleteAttractionsDetails,
    getAttractionsSafety, getAttractionsSafetyTitle, getAttractionsSafetySubtitle, getAttractionsSafetyRules, addAttractionsSafety, updateAttractionsSafety, deleteAttractionsSafety,
    getAttractionsCta, getAttractionsCtaButton, getAttractionsCtaUrl, addAttractionsCta, updateAttractionsCta, deleteAttractionsCta
} = require('../controllers/attractionsController');

const { upload } = require('../controllers/uploadController');
const router = express.Router();

router.get('/', getAttractionsPage);

router.get('/hero', getAttractionsHero);
router.post('/hero/add', upload.any(), addAttractionsHero);
router.put('/hero/update', upload.any(), updateAttractionsHero);
router.delete('/hero/delete', upload.any(), deleteAttractionsHero);
router.get('/hero/text', getAttractionsHeroText);

router.get('/details', getAttractionsDetails);
router.post('/details/add', upload.any(), addAttractionsDetails);
router.put('/details/update', upload.any(), updateAttractionsDetails);
router.delete('/details/delete', upload.any(), deleteAttractionsDetails);
router.get('/details/text', getAttractionsDetailsText);
router.get('/list', getAttractionsList); // Preserve old list route

router.get('/safety', getAttractionsSafety);
router.post('/safety/add', upload.any(), addAttractionsSafety);
router.put('/safety/update', upload.any(), updateAttractionsSafety);
router.delete('/safety/delete', upload.any(), deleteAttractionsSafety);
router.get('/safety/title', getAttractionsSafetyTitle);
router.get('/safety/subtitle', getAttractionsSafetySubtitle);
router.get('/safety/rules', getAttractionsSafetyRules);

router.get('/cta', getAttractionsCta);
router.post('/cta/add', upload.any(), addAttractionsCta);
router.put('/cta/update', upload.any(), updateAttractionsCta);
router.delete('/cta/delete', upload.any(), deleteAttractionsCta);
router.get('/cta/buttonLabel', getAttractionsCtaButton);
router.get('/cta/url', getAttractionsCtaUrl);

module.exports = router;
