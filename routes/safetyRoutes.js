const express = require('express');
const {
    getSafety,
    getSafetyTitle,
    getSafetySubtitle,
    getSafetyReminder,
    getSafetyRules,
    getSafetyRulesList,
    getSafetyCta,
    updateSafetyHeader,
    updateSafetyReminder, deleteSafetyReminder,
    updateSafetyRules, deleteSafetyRules,
    updateSafetyCta
} = require('../controllers/safetyController');

const router = express.Router();

router.get('/', getSafety);
router.get('/title', getSafetyTitle);
router.get('/subtitle', getSafetySubtitle);
router.put('/header/update', updateSafetyHeader); // custom route

router.get('/reminder', getSafetyReminder);
router.put('/reminder/update', updateSafetyReminder);
router.delete('/reminder/delete', deleteSafetyReminder);

router.get('/rules', getSafetyRules);
router.put('/rules/update', updateSafetyRules);
router.delete('/rules/delete', deleteSafetyRules);
router.get('/rules/list', getSafetyRulesList);

router.get('/cta', getSafetyCta);
router.put('/cta/update', updateSafetyCta);

module.exports = router;
