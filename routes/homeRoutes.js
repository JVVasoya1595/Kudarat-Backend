const express = require('express');
const {
    getHomePage, getHero, getHeroBackground, getHeroText,
    addHero, updateHero, deleteHero,
    getFacilities, getFacilitiesText, getFacilitiesCards,
    addFacilities, updateFacilities, deleteFacilities,
    getRides, getRidesText, getRidesCards, getRidesButton,
    addRides, updateRides, deleteRides,
    getPricing, getPricingText, getPricingCards,
    addPricing, updatePricing, deletePricing,
    getGallery, getGalleryText, getGalleryImages,
    addGallery, updateGallery, deleteGallery,
    getLocation, getLocationText, getLocationInfo,
    addLocation, updateLocation, deleteLocation
} = require('../controllers/homeController');
const { upload } = require('../controllers/uploadController');
const router = express.Router();

router.get('/', getHomePage);

router.get('/hero', getHero);
router.post('/hero/add', upload.any(), addHero);
router.put('/hero/update', upload.any(), updateHero);
router.delete('/hero/delete', upload.any(), deleteHero);

router.get('/hero/background', getHeroBackground);
router.get('/hero/text', getHeroText);

router.get('/facilities', getFacilities);
router.post('/facilities/add', upload.any(), addFacilities);
router.put('/facilities/update', upload.any(), updateFacilities);
router.delete('/facilities/delete', upload.any(), deleteFacilities);

router.get('/facilities/text', getFacilitiesText);
router.get('/facilities/cards', getFacilitiesCards);

router.get('/rides', getRides);
router.post('/rides/add', upload.any(), addRides);
router.put('/rides/update', upload.any(), updateRides);
router.delete('/rides/delete', upload.any(), deleteRides);

router.get('/rides/text', getRidesText);
router.get('/rides/cards', getRidesCards);
router.get('/rides/button', getRidesButton);

router.get('/pricing', getPricing);
router.post('/pricing/add', upload.any(), addPricing);
router.put('/pricing/update', upload.any(), updatePricing);
router.delete('/pricing/delete', upload.any(), deletePricing);

router.get('/pricing/text', getPricingText);
router.get('/pricing/cards', getPricingCards);

router.get('/gallery', getGallery);
router.post('/gallery/add', upload.any(), addGallery);
router.put('/gallery/update', upload.any(), updateGallery);
router.delete('/gallery/delete', upload.any(), deleteGallery);

router.get('/gallery/text', getGalleryText);
router.get('/gallery/images', getGalleryImages);

router.get('/location', getLocation);
router.post('/location/add', upload.any(), addLocation);
router.put('/location/update', upload.any(), updateLocation);
router.delete('/location/delete', upload.any(), deleteLocation);

router.get('/location/text', getLocationText);
router.get('/location/info', getLocationInfo);

module.exports = router;
