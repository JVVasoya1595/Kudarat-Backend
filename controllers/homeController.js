const Home = require('../models/Home');

// @desc    Get Hero section data
// @route   GET /home/hero
// @access  Public
const getHero = async (req, res) => {
    try {
        const home = await Home.findOne();
        if (!home) return res.status(404).json({ success: false, error: 'Data not seeded' });
        res.status(200).json(home.hero);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Get Premium Facilities section data
// @route   GET /home/facilities
// @access  Public
const getFacilities = async (req, res) => {
    try {
        const home = await Home.findOne();
        if (!home) return res.status(404).json({ success: false, error: 'Data not seeded' });
        res.status(200).json(home.premiumFacilities);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Get Signature Rides section data
// @route   GET /home/rides
// @access  Public
const getRides = async (req, res) => {
    try {
        const home = await Home.findOne();
        if (!home) return res.status(404).json({ success: false, error: 'Data not seeded' });
        res.status(200).json(home.signatureRides);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Get Pricing section data
// @route   GET /home/pricing
// @access  Public
const getPricing = async (req, res) => {
    try {
        const home = await Home.findOne();
        if (!home) return res.status(404).json({ success: false, error: 'Data not seeded' });
        res.status(200).json(home.pricing);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Get Gallery section data
// @route   GET /home/gallery
// @access  Public
const getGallery = async (req, res) => {
    try {
        const home = await Home.findOne();
        if (!home) return res.status(404).json({ success: false, error: 'Data not seeded' });
        res.status(200).json(home.gallery);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Get Location section data
// @route   GET /home/location
// @access  Public
const getLocation = async (req, res) => {
    try {
        const home = await Home.findOne();
        if (!home) return res.status(404).json({ success: false, error: 'Data not seeded' });
        res.status(200).json(home.location);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { getHero, getFacilities, getRides, getPricing, getGallery, getLocation };
