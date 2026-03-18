const express = require('express');
const {
    getGallery,
    getGalleryTitle,
    getGallerySubtitle,
    getGalleryCategories,
    getGalleryVideo
} = require('../controllers/galleryController');

const router = express.Router();

router.get('/', getGallery);
router.get('/title', getGalleryTitle);
router.get('/subtitle', getGallerySubtitle);
router.get('/categories', getGalleryCategories);
router.get('/video', getGalleryVideo);

module.exports = router;
