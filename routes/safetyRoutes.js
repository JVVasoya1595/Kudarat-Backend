const express = require('express');
const {
    getSafety,
    getSafetyTitle,
    getSafetySubtitle,
    getSafetyReminder,
    getSafetyRules,
    getSafetyRulesList,
    getSafetyCta,
    addSafetyHeader, updateSafetyHeader, deleteSafetyHeader,
    addSafetyReminder, updateSafetyReminder, deleteSafetyReminder,
    addSafetyRules, updateSafetyRules, deleteSafetyRules,
    addSafetyCta, updateSafetyCta, deleteSafetyCta
} = require('../controllers/safetyController');

const router = express.Router();

router.get('/', getSafety);
router.get('/title', getSafetyTitle);
router.get('/subtitle', getSafetySubtitle);
router.post('/header/add', addSafetyHeader);
router.put('/header/update', updateSafetyHeader);
router.delete('/header/delete', deleteSafetyHeader);

router.get('/reminder', getSafetyReminder);
router.post('/reminder/add', addSafetyReminder);
router.put('/reminder/update', updateSafetyReminder);
router.delete('/reminder/delete', deleteSafetyReminder);

router.get('/rules', getSafetyRules);
router.post('/rules/add', addSafetyRules);
router.put('/rules/update', updateSafetyRules);
router.delete('/rules/delete', deleteSafetyRules);
router.get('/rules/list', getSafetyRulesList);

router.get('/cta', getSafetyCta);
router.post('/cta/add', addSafetyCta);
router.put('/cta/update', updateSafetyCta);
router.delete('/cta/delete', deleteSafetyCta);

module.exports = router;
