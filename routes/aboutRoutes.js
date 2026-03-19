const express = require('express');
const {
    getAbout,
    getAboutHero, getAboutHeroText, addAboutHero, updateAboutHero, deleteAboutHero,
    getAboutStory, getAboutStoryTitle, getAboutStoryDescription, addAboutStory, updateAboutStory, deleteAboutStory,
    getAboutFeatures, getAboutFeaturesTitle, getAboutFeaturesCards, addAboutFeatures, updateAboutFeatures, deleteAboutFeatures,
    getAboutSupport, getAboutSupportTitle, getAboutSupportPhone, getAboutSupportEmail, getAboutSupportButton, addAboutSupport, updateAboutSupport, deleteAboutSupport
} = require('../controllers/aboutController');

const { upload } = require('../controllers/uploadController');
const router = express.Router();

router.get('/', getAbout);

router.get('/hero', getAboutHero);
router.post('/hero/add', upload.any(), addAboutHero);
router.put('/hero/update', upload.any(), updateAboutHero);
router.delete('/hero/delete', deleteAboutHero);
router.get('/hero/text', getAboutHeroText);

router.get('/story', getAboutStory);
router.post('/story/add', addAboutStory);
router.put('/story/update', updateAboutStory);
router.delete('/story/delete', deleteAboutStory);
router.get('/story/title', getAboutStoryTitle);
router.get('/story/description', getAboutStoryDescription);

router.get('/features', getAboutFeatures);
router.post('/features/add', addAboutFeatures);
router.put('/features/update', updateAboutFeatures);
router.delete('/features/delete', deleteAboutFeatures);
router.get('/features/title', getAboutFeaturesTitle);
router.get('/features/cards', getAboutFeaturesCards);

router.get('/support', getAboutSupport);
router.post('/support/add', addAboutSupport);
router.put('/support/update', updateAboutSupport);
router.delete('/support/delete', deleteAboutSupport);
router.get('/support/title', getAboutSupportTitle);
router.get('/support/phone', getAboutSupportPhone);
router.get('/support/email', getAboutSupportEmail);
router.get('/support/button', getAboutSupportButton);

module.exports = router;
