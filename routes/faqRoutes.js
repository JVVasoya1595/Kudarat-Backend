const express = require('express');
const {
    getFaq,
    getFaqTitle,
    getFaqSubtitle,
    getFaqItems,
    getFaqCta,
    updateFaqHeader,
    updateFaqItems,
    deleteFaqItems,
    updateFaqCta
} = require('../controllers/faqController');

const router = express.Router();

router.get('/', getFaq);
router.get('/title', getFaqTitle);
router.get('/subtitle', getFaqSubtitle);
router.put('/header/update', updateFaqHeader); // Custom

router.get('/faqs', getFaqItems);
router.put('/faqs/update', updateFaqItems);
router.delete('/faqs/delete', deleteFaqItems);

router.get('/cta', getFaqCta);
router.put('/cta/update', updateFaqCta);

module.exports = router;
