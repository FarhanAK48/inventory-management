const express = require('express');
const router = express.Router();

const transController = require('../controllers/transactions')

router.post('/add', transController.createTranasction);
router.get('/get', transController.getAllTranasctions);
router.put('/update', transController.updateTranasction);
router.delete('/delete', transController.deleteTranasction);

module.exports = router;