const express = require('express');
const { getHomePage, getHero, getFacilities, getRides, getPricing, getGallery, getLocation } = require('../controllers/homeController');
const router = express.Router();

router.get('/', getHomePage);
router.get('/hero', getHero);
router.get('/facilities', getFacilities);
router.get('/rides', getRides);
router.get('/pricing', getPricing);
router.get('/gallery', getGallery);
router.get('/location', getLocation);

module.exports = router;
