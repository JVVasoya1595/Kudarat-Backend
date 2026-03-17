const express = require('express');
const {
    getHomePage, getHero, getHeroBackground, getHeroText,
    getFacilities, getFacilitiesText, getFacilitiesCards,
    getRides, getRidesText, getRidesCards, getRidesButton,
    getPricing, getPricingText, getPricingCards,
    getGallery, getGalleryText, getGalleryImages,
    getLocation, getLocationText, getLocationInfo
} = require('../controllers/homeController');
const router = express.Router();

router.get('/', getHomePage);

router.get('/hero', getHero);
router.get('/hero/background', getHeroBackground);
router.get('/hero/text', getHeroText);

router.get('/facilities', getFacilities);
router.get('/facilities/text', getFacilitiesText);
router.get('/facilities/cards', getFacilitiesCards);

router.get('/rides', getRides);
router.get('/rides/text', getRidesText);
router.get('/rides/cards', getRidesCards);
router.get('/rides/button', getRidesButton);

router.get('/pricing', getPricing);
router.get('/pricing/text', getPricingText);
router.get('/pricing/cards', getPricingCards);

router.get('/gallery', getGallery);
router.get('/gallery/text', getGalleryText);
router.get('/gallery/images', getGalleryImages);

router.get('/location', getLocation);
router.get('/location/text', getLocationText);
router.get('/location/info', getLocationInfo);

module.exports = router;
