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

const addGalleryHeader = async (req, res) => {
    try {
        let doc = await GalleryPage.findOne();
        if (!doc) doc = new GalleryPage();
        const { title, subtitle } = req.body;
        doc.title = title || '';
        doc.subtitle = subtitle || '';
        await doc.save();
        res.status(201).json({ success: true, data: { title: doc.title, subtitle: doc.subtitle }, message: 'Header added' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const updateGalleryHeader = async (req, res) => {
    try {
        let doc = await GalleryPage.findOne();
        if (!doc) doc = new GalleryPage();
        const { title, subtitle } = req.body;
        if (title !== undefined && title !== null) doc.title = title;
        if (subtitle !== undefined && subtitle !== null) doc.subtitle = subtitle;
        await doc.save();
        res.status(200).json({ success: true, data: { title: doc.title, subtitle: doc.subtitle }, message: 'Header updated' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const deleteGalleryHeader = async (req, res) => {
    try {
        let doc = await GalleryPage.findOne();
        if (!doc) return res.status(404).json({ success: false, error: 'Data not seeded' });
        const { title, subtitle } = req.body;
        const fields = Array.isArray(req.body) ? req.body : Array.isArray(req.body.fields) ? req.body.fields : [];
        if (Object.keys(req.body).length === 0) {
            doc.title = ''; doc.subtitle = '';
        } else {
            if (title === true || fields.includes('title')) doc.title = '';
            if (subtitle === true || fields.includes('subtitle')) doc.subtitle = '';
        }
        await doc.save();
        res.status(200).json({ success: true, data: { title: doc.title, subtitle: doc.subtitle }, message: 'Header deleted' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const addGalleryCategories = async (req, res) => {
    try {
        let doc = await GalleryPage.findOne();
        if (!doc) doc = new GalleryPage();
        const { categories } = req.body;
        doc.categories = categories ? (Array.isArray(categories) ? categories : [categories]) : [];
        await doc.save();
        res.status(201).json({ success: true, data: doc.categories, message: 'Categories added' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const updateGalleryCategories = async (req, res) => {
    try {
        let doc = await GalleryPage.findOne();
        if (!doc) doc = new GalleryPage();
        const { categories, index } = req.body;
        if (categories !== undefined && categories !== null) {
            if (index !== undefined && typeof index === 'number') {
                if (index >= 0 && index < doc.categories.length) {
                    const curr = doc.categories[index];
                    if (categories.label !== undefined) curr.label = categories.label;
                    if (categories.value !== undefined) curr.value = categories.value;
                    if (categories.images !== undefined) curr.images = categories.images;
                }
            } else {
                doc.categories = Array.isArray(categories) ? categories : [categories];
            }
        }
        await doc.save();
        res.status(200).json({ success: true, data: doc.categories, message: 'Categories updated' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const deleteGalleryCategories = async (req, res) => {
    try {
        let doc = await GalleryPage.findOne();
        if (!doc) return res.status(404).json({ success: false, error: 'Data not seeded' });
        const { index } = req.body;
        if (index !== undefined && typeof index === 'number') {
            if (index >= 0 && index < doc.categories.length) doc.categories.splice(index, 1);
        } else {
            doc.categories = [];
        }
        await doc.save();
        res.status(200).json({ success: true, data: doc.categories, message: 'Categories deleted' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const addGalleryVideo = async (req, res) => {
    try {
        let doc = await GalleryPage.findOne();
        if (!doc) doc = new GalleryPage();
        const { title, url, placeholder } = req.body;
        doc.video = { title: title || '', url: url || '', placeholder: placeholder || '' };
        await doc.save();
        res.status(201).json({ success: true, data: doc.video, message: 'Video section added' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const updateGalleryVideo = async (req, res) => {
    try {
        let doc = await GalleryPage.findOne();
        if (!doc) doc = new GalleryPage();
        const { title, url, placeholder } = req.body;
        if (title !== undefined && title !== null) doc.video.title = title;
        if (url !== undefined && url !== null) doc.video.url = url;
        if (placeholder !== undefined && placeholder !== null) doc.video.placeholder = placeholder;
        await doc.save();
        res.status(200).json({ success: true, data: doc.video, message: 'Video section updated' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const deleteGalleryVideo = async (req, res) => {
    try {
        let doc = await GalleryPage.findOne();
        if (!doc) return res.status(404).json({ success: false, error: 'Data not seeded' });
        const { title, url, placeholder } = req.body;
        const fields = Array.isArray(req.body) ? req.body : Array.isArray(req.body.fields) ? req.body.fields : [];
        if (Object.keys(req.body).length === 0) {
            doc.video = { title: '', url: '', placeholder: '' };
        } else {
            if (title === true || fields.includes('title')) doc.video.title = '';
            if (url === true || fields.includes('url')) doc.video.url = '';
            if (placeholder === true || fields.includes('placeholder')) doc.video.placeholder = '';
        }
        await doc.save();
        res.status(200).json({ success: true, data: doc.video, message: 'Video section deletion processed' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

module.exports = {
    getGallery,
    getGalleryTitle,
    getGallerySubtitle,
    getGalleryCategories,
    getGalleryVideo,
    addGalleryHeader, updateGalleryHeader, deleteGalleryHeader,
    addGalleryCategories, updateGalleryCategories, deleteGalleryCategories,
    addGalleryVideo, updateGalleryVideo, deleteGalleryVideo
};
