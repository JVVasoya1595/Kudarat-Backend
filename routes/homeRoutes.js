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
const router = express.Router();

router.get('/', getHomePage);

router.get('/hero', getHero);
router.post('/hero/add', addHero);
router.put('/hero/update', updateHero);
router.delete('/hero/delete', deleteHero);

router.get('/hero/background', getHeroBackground);
router.get('/hero/text', getHeroText);

router.get('/facilities', getFacilities);
router.post('/facilities/add', addFacilities);
router.put('/facilities/update', updateFacilities);
router.delete('/facilities/delete', deleteFacilities);

router.get('/facilities/text', getFacilitiesText);
router.get('/facilities/cards', getFacilitiesCards);

router.get('/rides', getRides);
router.post('/rides/add', addRides);
router.put('/rides/update', updateRides);
router.delete('/rides/delete', deleteRides);

router.get('/rides/text', getRidesText);
router.get('/rides/cards', getRidesCards);
router.get('/rides/button', getRidesButton);

router.get('/pricing', getPricing);
router.post('/pricing/add', addPricing);
router.put('/pricing/update', updatePricing);
router.delete('/pricing/delete', deletePricing);

router.get('/pricing/text', getPricingText);
router.get('/pricing/cards', getPricingCards);

router.get('/gallery', getGallery);
router.post('/gallery/add', addGallery);
router.put('/gallery/update', updateGallery);
router.delete('/gallery/delete', deleteGallery);

router.get('/gallery/text', getGalleryText);
router.get('/gallery/images', getGalleryImages);

router.get('/location', getLocation);
router.post('/location/add', addLocation);
router.put('/location/update', updateLocation);
router.delete('/location/delete', deleteLocation);

router.get('/location/text', getLocationText);
router.get('/location/info', getLocationInfo);

module.exports = router;
