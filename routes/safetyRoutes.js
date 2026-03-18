const express = require('express');
const {
    getSafety,
    getSafetyTitle,
    getSafetySubtitle,
    getSafetyReminder,
    getSafetyRules,
    getSafetyRulesList,
    getSafetyCta
} = require('../controllers/safetyController');

const router = express.Router();

router.get('/', getSafety);
router.get('/title', getSafetyTitle);
router.get('/subtitle', getSafetySubtitle);
router.get('/reminder', getSafetyReminder);
router.get('/rules', getSafetyRules);
router.get('/rules/list', getSafetyRulesList);
router.get('/cta', getSafetyCta);

module.exports = router;
