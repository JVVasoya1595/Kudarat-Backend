const express = require('express');
const router = express.Router();
const { getAllData } = require('../controllers/globalController');

router.get('/', getAllData);

module.exports = router;
