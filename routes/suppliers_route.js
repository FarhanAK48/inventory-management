const express = require('express');
const router = express.Router();

const supController = require('../controllers/supplier')

router.post('/add', supController.createSupplier);
router.get('/get', supController.getSuppliers);
router.put('/update', supController.updateSupplier);
router.delete('/delete', supController.deleteSupplier);

module.exports = router;