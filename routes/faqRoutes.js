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

const router = express.Router();

router.get('/', getFaq);
router.get('/title', getFaqTitle);
router.get('/subtitle', getFaqSubtitle);
router.post('/header/add', addFaqHeader);
router.put('/header/update', updateFaqHeader);
router.delete('/header/delete', deleteFaqHeader);

router.get('/faqs', getFaqItems);
router.post('/faqs/add', addFaqItems);
router.put('/faqs/update', updateFaqItems);
router.delete('/faqs/delete', deleteFaqItems);

router.get('/cta', getFaqCta);
router.post('/cta/add', addFaqCta);
router.put('/cta/update', updateFaqCta);
router.delete('/cta/delete', deleteFaqCta);

module.exports = router;
