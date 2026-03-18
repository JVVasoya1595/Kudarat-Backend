const GalleryPage = require('../models/GalleryPage');

const gen = (propPath) => async (req, res) => {
    try {
        const doc = await GalleryPage.findOne();
        if (!doc) return res.status(404).json({ success: false, error: 'Gallery data not seeded' });

        const parts = propPath.split('.');
        let val = doc;
        for (const p of parts) {
            if (p === '') continue;
            if (val) val = val[p];
        }
        res.status(200).json(val);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const getGallery = async (req, res) => {
    try {
        const doc = await GalleryPage.findOne();
        if (!doc) return res.status(404).json({ success: false, error: 'Gallery data not seeded' });
        // Explicit ordering: title → subtitle → categories → video
        res.status(200).json({
            _id: doc._id,
            title: doc.title,
            subtitle: doc.subtitle,
            categories: doc.categories,
            video: doc.video,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const getGalleryTitle = gen('title');
const getGallerySubtitle = gen('subtitle');
const getGalleryCategories = gen('categories');
const getGalleryVideo = gen('video');

module.exports = {
    getGallery,
    getGalleryTitle,
    getGallerySubtitle,
    getGalleryCategories,
    getGalleryVideo
};
