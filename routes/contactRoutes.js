const express = require('express');
const { getContactPage, createInquiry } = require('../controllers/contactController');
const router = express.Router();

router.get('/', getContactPage);
router.post('/inquiry', createInquiry);

module.exports = router;
