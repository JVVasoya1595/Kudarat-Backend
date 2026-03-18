const express = require('express');
const router = express.Router();
const { upload, uploadFile } = require('../controllers/uploadController');

// Expect 'image' in multipart/form-data
router.post('/', upload.single('image'), uploadFile);

module.exports = router;
