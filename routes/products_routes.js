const express = require('express');
const router = express.Router();

const productController =  require('../controllers/product');

router.post('/add', productController.addProduct);
router.get('/get', productController.getProducts);
router.put('/update', productController.updateProduct);
router.delete('/delete', productController.deleteProduct);



module.exports = router;