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

const { upload } = require('../controllers/uploadController');
const router = express.Router();

router.get('/', getGallery);
router.get('/title', getGalleryTitle);
router.get('/subtitle', getGallerySubtitle);
router.post('/header/add', upload.any(), addGalleryHeader);
router.put('/header/update', upload.any(), updateGalleryHeader);
router.delete('/header/delete', upload.any(), deleteGalleryHeader);

router.get('/categories', getGalleryCategories);
router.post('/categories/add', upload.any(), addGalleryCategories);
router.put('/categories/update', upload.any(), updateGalleryCategories);
router.delete('/categories/delete', upload.any(), deleteGalleryCategories);

router.get('/video', getGalleryVideo);
router.post('/video/add', upload.any(), addGalleryVideo);
router.put('/video/update', upload.any(), updateGalleryVideo);
router.delete('/video/delete', upload.any(), deleteGalleryVideo);

module.exports = router;
