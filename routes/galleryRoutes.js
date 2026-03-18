const express = require('express');
const {
    getGallery,
    getGalleryTitle,
    getGallerySubtitle,
    getGalleryCategories,
    getGalleryVideo,
    addGalleryHeader, updateGalleryHeader, deleteGalleryHeader,
    addGalleryCategories, updateGalleryCategories, deleteGalleryCategories,
    addGalleryVideo, updateGalleryVideo, deleteGalleryVideo
} = require('../controllers/galleryController');

const router = express.Router();

router.get('/', getGallery);
router.get('/title', getGalleryTitle);
router.get('/subtitle', getGallerySubtitle);
router.post('/header/add', addGalleryHeader);
router.put('/header/update', updateGalleryHeader);
router.delete('/header/delete', deleteGalleryHeader);

router.get('/categories', getGalleryCategories);
router.post('/categories/add', addGalleryCategories);
router.put('/categories/update', updateGalleryCategories);
router.delete('/categories/delete', deleteGalleryCategories);

router.get('/video', getGalleryVideo);
router.post('/video/add', addGalleryVideo);
router.put('/video/update', updateGalleryVideo);
router.delete('/video/delete', deleteGalleryVideo);

module.exports = router;
