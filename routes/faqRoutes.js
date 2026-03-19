const express = require('express');
const {
    getFaq,
    getFaqTitle,
    getFaqSubtitle,
    getFaqItems,
    getFaqCta,
    addFaqHeader, updateFaqHeader, deleteFaqHeader,
    addFaqItems, updateFaqItems, deleteFaqItems,
    addFaqCta, updateFaqCta, deleteFaqCta
} = require('../controllers/faqController');

const { upload } = require('../controllers/uploadController');
const router = express.Router();

router.get('/', getFaq);
router.get('/title', getFaqTitle);
router.get('/subtitle', getFaqSubtitle);
router.post('/header/add', upload.any(), addFaqHeader);
router.put('/header/update', upload.any(), updateFaqHeader);
router.delete('/header/delete', upload.any(), deleteFaqHeader);

router.get('/faqs', getFaqItems);
router.post('/faqs/add', upload.any(), addFaqItems);
router.put('/faqs/update', upload.any(), updateFaqItems);
router.delete('/faqs/delete', upload.any(), deleteFaqItems);

router.get('/cta', getFaqCta);
router.post('/cta/add', upload.any(), addFaqCta);
router.put('/cta/update', upload.any(), updateFaqCta);
router.delete('/cta/delete', upload.any(), deleteFaqCta);

module.exports = router;
