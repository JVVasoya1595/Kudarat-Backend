const About = require('../models/About');

const gen = (propPath, status = 200) => async (req, res) => {
    try {
        const doc = await About.findOne();
        if (!doc) return res.status(404).json({ success: false, error: 'About data not seeded' });

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

const getAbout = async (req, res) => {
    try {
        const doc = await About.findOne();
        if (!doc) return res.status(404).json({ success: false, error: 'About data not seeded' });
        const { hero, story, features, support } = doc;
        res.status(200).json({ hero, story, features, support });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const getAboutHero = gen('hero');
const getAboutHeroText = gen('hero.text');
const getAboutHeroBackground = gen('hero.backgroundUrl');

const getAboutStory = gen('story');
const getAboutStoryTitle = gen('story.title');
const getAboutStoryDescription = gen('story.description');

const getAboutFeatures = gen('features');
const getAboutFeaturesTitle = gen('features.title');
const getAboutFeaturesCards = gen('features.cards');

const getAboutSupport = gen('support');
const getAboutSupportTitle = gen('support.title');
const getAboutSupportPhone = gen('support.phone');
const getAboutSupportEmail = gen('support.email');
const getAboutSupportButton = gen('support.button');

module.exports = {
    getAbout,
    getAboutHero, getAboutHeroText, getAboutHeroBackground,
    getAboutStory, getAboutStoryTitle, getAboutStoryDescription,
    getAboutFeatures, getAboutFeaturesTitle, getAboutFeaturesCards,
    getAboutSupport, getAboutSupportTitle, getAboutSupportPhone, getAboutSupportEmail, getAboutSupportButton
};
