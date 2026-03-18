const express = require('express');
const {
    getGallery,
    getGalleryTitle,
    getGallerySubtitle,
    getGalleryCategories,
    getGalleryVideo,
    updateGalleryHeader,
    updateGalleryCategories, deleteGalleryCategories,
    updateGalleryVideo, deleteGalleryVideo
} = require('../controllers/galleryController');

const router = express.Router();

router.get('/', getGallery);
router.get('/title', getGalleryTitle);
router.get('/subtitle', getGallerySubtitle);
router.put('/header/update', updateGalleryHeader);

router.get('/categories', getGalleryCategories);
router.put('/categories/update', updateGalleryCategories);
router.delete('/categories/delete', deleteGalleryCategories);

router.get('/video', getGalleryVideo);
router.put('/video/update', updateGalleryVideo);
router.delete('/video/delete', deleteGalleryVideo);

module.exports = router;
