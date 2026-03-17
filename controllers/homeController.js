const Home = require('../models/Home');

const gen = (propPath, status = 200) => async (req, res) => {
    try {
        const doc = await Home.findOne();
        if (!doc) return res.status(404).json({ success: false, error: 'Data not seeded' });

        const parts = propPath.split('.');
        let val = doc;
        for (const p of parts) {
            if (p === '') continue;
            if (val) val = val[p];
        }
        res.status(status).json(val);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const getHomePage = async (req, res) => {
    try {
        const home = await Home.findOne();
        if (!home) return res.status(404).json({ success: false, error: 'Data not seeded' });
        res.status(200).json({ success: true, data: home });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const getHero = gen('hero');
const getHeroBackground = gen('hero.background');
const getHeroText = gen('hero.text');

const getFacilities = gen('premiumFacilities');
const getFacilitiesText = gen('premiumFacilities.text');
const getFacilitiesCards = gen('premiumFacilities.cards');

const getRides = gen('signatureRides');
const getRidesText = gen('signatureRides.text');
const getRidesCards = gen('signatureRides.cards');
const getRidesButton = gen('signatureRides.button');

const getPricing = gen('pricing');
const getPricingText = gen('pricing.text');
const getPricingCards = gen('pricing.cards');

const getGallery = gen('gallery');
const getGalleryText = gen('gallery.text');
const getGalleryImages = gen('gallery.images');

const getLocation = gen('location');
const getLocationText = gen('location.text');
const getLocationInfo = gen('location.info');

module.exports = {
    getHomePage, getHero, getHeroBackground, getHeroText,
    getFacilities, getFacilitiesText, getFacilitiesCards,
    getRides, getRidesText, getRidesCards, getRidesButton,
    getPricing, getPricingText, getPricingCards,
    getGallery, getGalleryText, getGalleryImages,
    getLocation, getLocationText, getLocationInfo
};
