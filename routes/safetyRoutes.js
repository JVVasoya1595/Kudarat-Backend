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

const { upload } = require('../controllers/uploadController');
const router = express.Router();

router.get('/', getSafety);
router.get('/title', getSafetyTitle);
router.get('/subtitle', getSafetySubtitle);
router.post('/header/add', upload.any(), addSafetyHeader);
router.put('/header/update', upload.any(), updateSafetyHeader);
router.delete('/header/delete', upload.any(), deleteSafetyHeader);

router.get('/reminder', getSafetyReminder);
router.post('/reminder/add', upload.any(), addSafetyReminder);
router.put('/reminder/update', upload.any(), updateSafetyReminder);
router.delete('/reminder/delete', upload.any(), deleteSafetyReminder);

router.get('/rules', getSafetyRules);
router.post('/rules/add', upload.any(), addSafetyRules);
router.put('/rules/update', upload.any(), updateSafetyRules);
router.delete('/rules/delete', upload.any(), deleteSafetyRules);
router.get('/rules/list', getSafetyRulesList);

router.get('/cta', getSafetyCta);
router.post('/cta/add', upload.any(), addSafetyCta);
router.put('/cta/update', upload.any(), updateSafetyCta);
router.delete('/cta/delete', upload.any(), deleteSafetyCta);

module.exports = router;
