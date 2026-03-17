const express = require('express');
const {
    getAbout,
    getAboutHero, getAboutHeroText, getAboutHeroBackground,
    getAboutStory, getAboutStoryTitle, getAboutStoryDescription,
    getAboutFeatures, getAboutFeaturesTitle, getAboutFeaturesCards,
    getAboutSupport, getAboutSupportTitle, getAboutSupportPhone, getAboutSupportEmail, getAboutSupportButton
} = require('../controllers/aboutController');

const router = express.Router();

router.get('/', getAbout);

router.get('/hero', getAboutHero);
router.get('/hero/text', getAboutHeroText);
router.get('/hero/backgroundUrl', getAboutHeroBackground);

router.get('/story', getAboutStory);
router.get('/story/title', getAboutStoryTitle);
router.get('/story/description', getAboutStoryDescription);

router.get('/features', getAboutFeatures);
router.get('/features/title', getAboutFeaturesTitle);
router.get('/features/cards', getAboutFeaturesCards);

router.get('/support', getAboutSupport);
router.get('/support/title', getAboutSupportTitle);
router.get('/support/phone', getAboutSupportPhone);
router.get('/support/email', getAboutSupportEmail);
router.get('/support/button', getAboutSupportButton);

module.exports = router;
