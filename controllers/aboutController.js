const About = require('../models/About');

// @desc    Get all About page data
// @route   GET /about
// @access  Public
const getAbout = async (req, res) => {
    try {
        const about = await About.findOne();
        if (!about) {
            return res.status(404).json({ success: false, error: 'About data not seeded' });
        }
        res.status(200).json(about);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Get About Hero section
// @route   GET /about/hero
// @access  Public
const getAboutHero = async (req, res) => {
    try {
        const about = await About.findOne();
        if (!about) return res.status(404).json({ success: false, error: 'Data not seeded' });
        res.status(200).json(about.hero);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Get About Story section
// @route   GET /about/story
// @access  Public
const getAboutStory = async (req, res) => {
    try {
        const about = await About.findOne();
        if (!about) return res.status(404).json({ success: false, error: 'Data not seeded' });
        res.status(200).json(about.story);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Get About Features section
// @route   GET /about/features
// @access  Public
const getAboutFeatures = async (req, res) => {
    try {
        const about = await About.findOne();
        if (!about) return res.status(404).json({ success: false, error: 'Data not seeded' });
        res.status(200).json(about.features);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Get About Support section
// @route   GET /about/support
// @access  Public
const getAboutSupport = async (req, res) => {
    try {
        const about = await About.findOne();
        if (!about) return res.status(404).json({ success: false, error: 'Data not seeded' });
        res.status(200).json(about.support);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    getAbout,
    getAboutHero,
    getAboutStory,
    getAboutFeatures,
    getAboutSupport
};
