const express = require('express');
const router = express.Router();
const { upload, uploadFile } = require('../controllers/uploadController');

// Expect any file field in multipart/form-data
router.post('/', upload.any(), uploadFile);

module.exports = router;
