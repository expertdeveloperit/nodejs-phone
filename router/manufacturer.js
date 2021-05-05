const express = require('express');
const { getManufacturerList, postManufacturer } = require('../controllers/manufacturerController');
const router = express.Router();


router.get('/manufacturer', getManufacturerList)
router.post('/manufacturer', postManufacturer)

module.exports = router;