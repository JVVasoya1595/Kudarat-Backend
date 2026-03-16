const express = require('express');
const {
    getAbout,
    getAboutHero,
    getAboutStory,
    getAboutFeatures,
    getAboutSupport
} = require('../controllers/aboutController');

const router = express.Router();

router.get('/', getAbout);
router.get('/hero', getAboutHero);
router.get('/story', getAboutStory);
router.get('/features', getAboutFeatures);
router.get('/support', getAboutSupport);

module.exports = router;
