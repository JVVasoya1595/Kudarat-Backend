const Attraction = require('../models/Attraction');

// @desc    Get all Attractions page data
// @route   GET /attractions
// @access  Public
const getAttractionsPage = async (req, res) => {
    try {
        const attractions = await Attraction.findOne();
        if (!attractions) {
            return res.status(404).json({ success: false, error: 'Attractions data not seeded' });
        }
        res.status(200).json(attractions);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Get Attractions Hero section
// @route   GET /attractions/hero
// @access  Public
const getAttractionsHero = async (req, res) => {
    try {
        const attractions = await Attraction.findOne();
        if (!attractions) return res.status(404).json({ success: false, error: 'Data not seeded' });
        res.status(200).json(attractions.hero);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Get Attractions List
// @route   GET /attractions/list
// @access  Public
const getAttractionsList = async (req, res) => {
    try {
        const attractions = await Attraction.findOne();
        if (!attractions) return res.status(404).json({ success: false, error: 'Data not seeded' });
        res.status(200).json(attractions.rideDetails.list);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    getAttractionsPage,
    getAttractionsHero,
    getAttractionsList
};
