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

// @desc    Add/Override hero section (POST)
const addHero = async (req, res) => {
    try {
        let home = await Home.findOne();
        if (!home) {
            home = new Home();
        }

        const { background, title, subtitle, description } = req.body;

        home.hero = {
            background: background ? (Array.isArray(background) ? background : [background]) : [],
            text: {
                title: title || '',
                subtitle: subtitle || '',
                description: description || ''
            }
        };

        await home.save();
        res.status(201).json({ success: true, data: home.hero, message: 'Hero section added successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Update partial hero section (PUT)
const updateHero = async (req, res) => {
    try {
        let home = await Home.findOne();
        if (!home) return res.status(404).json({ success: false, error: 'Data not seeded' });

        const { background, title, subtitle, description, index } = req.body;

        // If field is provided and not null, update it. Otherwise keep existing.
        if (background !== undefined && background !== null) {
            if (index !== undefined && typeof index === 'number') {
                if (index >= 0 && index < home.hero.background.length) {
                    home.hero.background[index] = background;
                }
            } else {
                home.hero.background = Array.isArray(background) ? background : [background];
            }
        }
        if (title !== undefined && title !== null) home.hero.text.title = title;
        if (subtitle !== undefined && subtitle !== null) home.hero.text.subtitle = subtitle;
        if (description !== undefined && description !== null) home.hero.text.description = description;

        await home.save();
        res.status(200).json({ success: true, data: home.hero, message: 'Hero section updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Clear/Delete partial or full hero section (DELETE)
const deleteHero = async (req, res) => {
    try {
        let home = await Home.findOne();
        if (!home) return res.status(404).json({ success: false, error: 'Data not seeded' });

        // Admin can pass an array like ["title", "background"] or an object like { "title": true }
        const { title, subtitle, description, background, index } = req.body;
        
        // If the array syntax is used direct on body (REST clients sometimes do this)
        const fields = Array.isArray(req.body) ? req.body : Array.isArray(req.body.fields) ? req.body.fields : [];

        // If body is completely empty, wipe the entire section
        if (Object.keys(req.body).length === 0) {
            home.hero = {
                background: [],
                text: { title: '', subtitle: '', description: '' }
            };
        } else {
            // Otherwise, target specific fields only
            if (title === true || fields.includes('title')) home.hero.text.title = '';
            if (subtitle === true || fields.includes('subtitle')) home.hero.text.subtitle = '';
            if (description === true || fields.includes('description')) home.hero.text.description = '';
            
            if (background === true || fields.includes('background')) {
                if (index !== undefined && typeof index === 'number') {
                    if (index >= 0 && index < home.hero.background.length) {
                        home.hero.background.splice(index, 1);
                    }
                } else {
                    home.hero.background = [];
                }
            }
        }

        await home.save();
        res.status(200).json({ success: true, data: home.hero, message: 'Hero deletion processed successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const getFacilities = gen('premiumFacilities');
const getFacilitiesText = gen('premiumFacilities.text');
const getFacilitiesCards = gen('premiumFacilities.cards');

// @desc    Add/Override facilities section (POST)
const addFacilities = async (req, res) => {
    try {
        let home = await Home.findOne();
        if (!home) home = new Home();

        const { tagline, title, subtitle, cards } = req.body;

        home.premiumFacilities = {
            text: {
                tagline: tagline || '',
                title: title || '',
                subtitle: subtitle || ''
            },
            cards: cards ? (Array.isArray(cards) ? cards : [cards]) : []
        };

        await home.save();
        res.status(201).json({ success: true, data: home.premiumFacilities, message: 'Facilities section added successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Update partial facilities section (PUT)
const updateFacilities = async (req, res) => {
    try {
        let home = await Home.findOne();
        if (!home) return res.status(404).json({ success: false, error: 'Data not seeded' });

        const { tagline, title, subtitle, cards, index } = req.body;

        if (tagline !== undefined && tagline !== null) home.premiumFacilities.text.tagline = tagline;
        if (title !== undefined && title !== null) home.premiumFacilities.text.title = title;
        if (subtitle !== undefined && subtitle !== null) home.premiumFacilities.text.subtitle = subtitle;
        
        if (cards !== undefined && cards !== null) {
            if (index !== undefined && typeof index === 'number') {
                if (index >= 0 && index < home.premiumFacilities.cards.length) {
                    const currentCard = home.premiumFacilities.cards[index];
                    if (cards.imageUrl !== undefined) currentCard.imageUrl = cards.imageUrl;
                    if (cards.title !== undefined) currentCard.title = cards.title;
                    if (cards.description !== undefined) currentCard.description = cards.description;
                }
            } else {
                home.premiumFacilities.cards = Array.isArray(cards) ? cards : [cards];
            }
        }

        await home.save();
        res.status(200).json({ success: true, data: home.premiumFacilities, message: 'Facilities section updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Clear/Delete partial or full facilities section (DELETE)
const deleteFacilities = async (req, res) => {
    try {
        let home = await Home.findOne();
        if (!home) return res.status(404).json({ success: false, error: 'Data not seeded' });

        const { tagline, title, subtitle, cards, index } = req.body;
        const fields = Array.isArray(req.body) ? req.body : Array.isArray(req.body.fields) ? req.body.fields : [];

        if (Object.keys(req.body).length === 0) {
            home.premiumFacilities = {
                text: { tagline: '', title: '', subtitle: '' },
                cards: []
            };
        } else {
            if (tagline === true || fields.includes('tagline')) home.premiumFacilities.text.tagline = '';
            if (title === true || fields.includes('title')) home.premiumFacilities.text.title = '';
            if (subtitle === true || fields.includes('subtitle')) home.premiumFacilities.text.subtitle = '';
            
            if (cards === true || fields.includes('cards')) {
                if (index !== undefined && typeof index === 'number') {
                    if (index >= 0 && index < home.premiumFacilities.cards.length) {
                        home.premiumFacilities.cards.splice(index, 1);
                    }
                } else {
                    home.premiumFacilities.cards = [];
                }
            }
        }

        await home.save();
        res.status(200).json({ success: true, data: home.premiumFacilities, message: 'Facilities deletion processed successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const getRides = gen('signatureRides');
const getRidesText = gen('signatureRides.text');
const getRidesCards = gen('signatureRides.cards');
const getRidesButton = gen('signatureRides.button');

const addRides = async (req, res) => {
    try {
        let home = await Home.findOne();
        if (!home) home = new Home();
        const { tagline, title, subtitle, cards, button } = req.body;
        home.signatureRides = {
            text: { tagline: tagline || '', title: title || '', subtitle: subtitle || '' },
            cards: cards ? (Array.isArray(cards) ? cards : [cards]) : [],
            button: button || { label: '', url: '' }
        };
        await home.save();
        res.status(201).json({ success: true, data: home.signatureRides, message: 'Rides section added successfully' });
    } catch (error) { res.status(500).json({ success: false, error: error.message }); }
};

const updateRides = async (req, res) => {
    try {
        let home = await Home.findOne();
        if (!home) return res.status(404).json({ success: false, error: 'Data not seeded' });
        const { tagline, title, subtitle, cards, button, index } = req.body;

        if (tagline !== undefined && tagline !== null) home.signatureRides.text.tagline = tagline;
        if (title !== undefined && title !== null) home.signatureRides.text.title = title;
        if (subtitle !== undefined && subtitle !== null) home.signatureRides.text.subtitle = subtitle;
        
        if (button !== undefined && button !== null) {
            if (button.label !== undefined) home.signatureRides.button.label = button.label;
            if (button.url !== undefined) home.signatureRides.button.url = button.url;
        }

        if (cards !== undefined && cards !== null) {
            if (index !== undefined && typeof index === 'number') {
                if (index >= 0 && index < home.signatureRides.cards.length) {
                    const currentCard = home.signatureRides.cards[index];
                    if (cards.title !== undefined) currentCard.title = cards.title;
                    if (cards.description !== undefined) currentCard.description = cards.description;
                }
            } else {
                home.signatureRides.cards = Array.isArray(cards) ? cards : [cards];
            }
        }
        await home.save();
        res.status(200).json({ success: true, data: home.signatureRides, message: 'Rides section updated successfully' });
    } catch (error) { res.status(500).json({ success: false, error: error.message }); }
};

const deleteRides = async (req, res) => {
    try {
        let home = await Home.findOne();
        if (!home) return res.status(404).json({ success: false, error: 'Data not seeded' });

        const { tagline, title, subtitle, cards, button, index } = req.body;
        const fields = Array.isArray(req.body) ? req.body : Array.isArray(req.body.fields) ? req.body.fields : [];

        if (Object.keys(req.body).length === 0) {
            home.signatureRides = { text: { tagline: '', title: '', subtitle: '' }, cards: [], button: { label: '', url: '' } };
        } else {
            if (tagline === true || fields.includes('tagline')) home.signatureRides.text.tagline = '';
            if (title === true || fields.includes('title')) home.signatureRides.text.title = '';
            if (subtitle === true || fields.includes('subtitle')) home.signatureRides.text.subtitle = '';
            
            if (button === true || fields.includes('button')) home.signatureRides.button = { label: '', url: '' };
            else if (button) {
                if (button.label === true) home.signatureRides.button.label = '';
                if (button.url === true) home.signatureRides.button.url = '';
            }

            if (cards === true || fields.includes('cards')) {
                if (index !== undefined && typeof index === 'number') {
                    if (index >= 0 && index < home.signatureRides.cards.length) home.signatureRides.cards.splice(index, 1);
                } else {
                    home.signatureRides.cards = [];
                }
            }
        }
        await home.save();
        res.status(200).json({ success: true, data: home.signatureRides, message: 'Rides deletion processed successfully' });
    } catch (error) { res.status(500).json({ success: false, error: error.message }); }
};

const getPricing = gen('pricing');
const getPricingText = gen('pricing.text');
const getPricingCards = gen('pricing.cards');

const addPricing = async (req, res) => {
    try {
        let home = await Home.findOne();
        if (!home) home = new Home();
        const { tagline, title, subtitle, cards } = req.body;
        home.pricing = {
            text: { tagline: tagline || '', title: title || '', subtitle: subtitle || '' },
            cards: cards ? (Array.isArray(cards) ? cards : [cards]) : []
        };
        await home.save();
        res.status(201).json({ success: true, data: home.pricing, message: 'Pricing section added successfully' });
    } catch (error) { res.status(500).json({ success: false, error: error.message }); }
};

const updatePricing = async (req, res) => {
    try {
        let home = await Home.findOne();
        if (!home) return res.status(404).json({ success: false, error: 'Data not seeded' });
        const { tagline, title, subtitle, cards, index } = req.body;

        if (tagline !== undefined && tagline !== null) home.pricing.text.tagline = tagline;
        if (title !== undefined && title !== null) home.pricing.text.title = title;
        if (subtitle !== undefined && subtitle !== null) home.pricing.text.subtitle = subtitle;
        
        if (cards !== undefined && cards !== null) {
            if (index !== undefined && typeof index === 'number') {
                if (index >= 0 && index < home.pricing.cards.length) {
                    const currentCard = home.pricing.cards[index];
                    if (cards.title !== undefined) currentCard.title = cards.title;
                    if (cards.subtitle !== undefined) currentCard.subtitle = cards.subtitle;
                    if (cards.price !== undefined) currentCard.price = cards.price;
                    if (cards.time !== undefined) currentCard.time = cards.time;
                    if (cards.requirements !== undefined) currentCard.requirements = cards.requirements;
                    if (cards.rent !== undefined) currentCard.rent = cards.rent;
                    if (cards.refund !== undefined) currentCard.refund = cards.refund;
                }
            } else {
                home.pricing.cards = Array.isArray(cards) ? cards : [cards];
            }
        }
        await home.save();
        res.status(200).json({ success: true, data: home.pricing, message: 'Pricing section updated successfully' });
    } catch (error) { res.status(500).json({ success: false, error: error.message }); }
};

const deletePricing = async (req, res) => {
    try {
        let home = await Home.findOne();
        if (!home) return res.status(404).json({ success: false, error: 'Data not seeded' });

        const { tagline, title, subtitle, cards, index } = req.body;
        const fields = Array.isArray(req.body) ? req.body : Array.isArray(req.body.fields) ? req.body.fields : [];

        if (Object.keys(req.body).length === 0) {
            home.pricing = { text: { tagline: '', title: '', subtitle: '' }, cards: [] };
        } else {
            if (tagline === true || fields.includes('tagline')) home.pricing.text.tagline = '';
            if (title === true || fields.includes('title')) home.pricing.text.title = '';
            if (subtitle === true || fields.includes('subtitle')) home.pricing.text.subtitle = '';
            
            if (cards === true || fields.includes('cards')) {
                if (index !== undefined && typeof index === 'number') {
                    if (index >= 0 && index < home.pricing.cards.length) home.pricing.cards.splice(index, 1);
                } else {
                    home.pricing.cards = [];
                }
            }
        }
        await home.save();
        res.status(200).json({ success: true, data: home.pricing, message: 'Pricing deletion processed successfully' });
    } catch (error) { res.status(500).json({ success: false, error: error.message }); }
};

const getGallery = gen('gallery');
const getGalleryText = gen('gallery.text');
const getGalleryImages = gen('gallery.images');

const addGallery = async (req, res) => {
    try {
        let home = await Home.findOne();
        if (!home) home = new Home();
        const { tagline, images } = req.body;
        home.gallery = {
            text: { tagline: tagline || '' },
            images: images ? (Array.isArray(images) ? images : [images]) : []
        };
        await home.save();
        res.status(201).json({ success: true, data: home.gallery, message: 'Gallery section added successfully' });
    } catch (error) { res.status(500).json({ success: false, error: error.message }); }
};

const updateGallery = async (req, res) => {
    try {
        let home = await Home.findOne();
        if (!home) return res.status(404).json({ success: false, error: 'Data not seeded' });
        const { tagline, images, index } = req.body;

        if (tagline !== undefined && tagline !== null) home.gallery.text.tagline = tagline;
        
        if (images !== undefined && images !== null) {
            if (index !== undefined && typeof index === 'number') {
                if (index >= 0 && index < home.gallery.images.length) home.gallery.images[index] = images;
            } else {
                home.gallery.images = Array.isArray(images) ? images : [images];
            }
        }
        await home.save();
        res.status(200).json({ success: true, data: home.gallery, message: 'Gallery section updated successfully' });
    } catch (error) { res.status(500).json({ success: false, error: error.message }); }
};

const deleteGallery = async (req, res) => {
    try {
        let home = await Home.findOne();
        if (!home) return res.status(404).json({ success: false, error: 'Data not seeded' });

        const { tagline, images, index } = req.body;
        const fields = Array.isArray(req.body) ? req.body : Array.isArray(req.body.fields) ? req.body.fields : [];

        if (Object.keys(req.body).length === 0) {
            home.gallery = { text: { tagline: '' }, images: [] };
        } else {
            if (tagline === true || fields.includes('tagline')) home.gallery.text.tagline = '';
            
            if (images === true || fields.includes('images')) {
                if (index !== undefined && typeof index === 'number') {
                    if (index >= 0 && index < home.gallery.images.length) home.gallery.images.splice(index, 1);
                } else {
                    home.gallery.images = [];
                }
            }
        }
        await home.save();
        res.status(200).json({ success: true, data: home.gallery, message: 'Gallery deletion processed successfully' });
    } catch (error) { res.status(500).json({ success: false, error: error.message }); }
};

const getLocation = gen('location');
const getLocationText = gen('location.text');
const getLocationInfo = gen('location.info');

const addLocation = async (req, res) => {
    try {
        let home = await Home.findOne();
        if (!home) home = new Home();
        const { tagline, title, subtitle, info } = req.body;
        home.location = {
            text: { tagline: tagline || '', title: title || '', subtitle: subtitle || '' },
            info: info || { address: '', phone: '', email: '', mapEmbedUrl: '' }
        };
        await home.save();
        res.status(201).json({ success: true, data: home.location, message: 'Location section added successfully' });
    } catch (error) { res.status(500).json({ success: false, error: error.message }); }
};

const updateLocation = async (req, res) => {
    try {
        let home = await Home.findOne();
        if (!home) return res.status(404).json({ success: false, error: 'Data not seeded' });
        const { tagline, title, subtitle, info } = req.body;

        if (tagline !== undefined && tagline !== null) home.location.text.tagline = tagline;
        if (title !== undefined && title !== null) home.location.text.title = title;
        if (subtitle !== undefined && subtitle !== null) home.location.text.subtitle = subtitle;
        
        if (info !== undefined && info !== null) {
            if (info.address !== undefined) home.location.info.address = info.address;
            if (info.phone !== undefined) home.location.info.phone = info.phone;
            if (info.email !== undefined) home.location.info.email = info.email;
            if (info.mapEmbedUrl !== undefined) home.location.info.mapEmbedUrl = info.mapEmbedUrl;
        }
        await home.save();
        res.status(200).json({ success: true, data: home.location, message: 'Location section updated successfully' });
    } catch (error) { res.status(500).json({ success: false, error: error.message }); }
};

const deleteLocation = async (req, res) => {
    try {
        let home = await Home.findOne();
        if (!home) return res.status(404).json({ success: false, error: 'Data not seeded' });

        const { tagline, title, subtitle, info } = req.body;
        const fields = Array.isArray(req.body) ? req.body : Array.isArray(req.body.fields) ? req.body.fields : [];

        if (Object.keys(req.body).length === 0) {
            home.location = { text: { tagline: '', title: '', subtitle: '' }, info: { address: '', phone: '', email: '', mapEmbedUrl: '' } };
        } else {
            if (tagline === true || fields.includes('tagline')) home.location.text.tagline = '';
            if (title === true || fields.includes('title')) home.location.text.title = '';
            if (subtitle === true || fields.includes('subtitle')) home.location.text.subtitle = '';
            
            if (info === true || fields.includes('info')) home.location.info = { address: '', phone: '', email: '', mapEmbedUrl: '' };
            else if (info) {
                if (info.address === true) home.location.info.address = '';
                if (info.phone === true) home.location.info.phone = '';
                if (info.email === true) home.location.info.email = '';
                if (info.mapEmbedUrl === true) home.location.info.mapEmbedUrl = '';
            }
        }
        await home.save();
        res.status(200).json({ success: true, data: home.location, message: 'Location deletion processed successfully' });
    } catch (error) { res.status(500).json({ success: false, error: error.message }); }
};

module.exports = {
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
};
