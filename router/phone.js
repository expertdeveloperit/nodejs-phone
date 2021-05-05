const express = require('express');
const { getPhones, postPhone, deletePhoneDetails, updatePhoneDetails, uploadPhonePhoto } = require('../controllers/phoneController');
const router = express.Router();


router.get('/phone', getPhones)
router.post('/phone', postPhone)
router.delete('/phone/:id', deletePhoneDetails);
router.post('/phone/upload:id', uploadPhonePhoto);
router.put('/phone/:id', updatePhoneDetails);

module.exports = router;