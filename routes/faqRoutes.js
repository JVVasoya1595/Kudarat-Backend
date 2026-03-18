const express = require('express');
const {
    getFaq,
    getFaqTitle,
    getFaqSubtitle,
    getFaqItems,
    getFaqCta
} = require('../controllers/faqController');

const router = express.Router();

router.get('/', getFaq);
router.get('/title', getFaqTitle);
router.get('/subtitle', getFaqSubtitle);
router.get('/faqs', getFaqItems);
router.get('/cta', getFaqCta);

module.exports = router;
