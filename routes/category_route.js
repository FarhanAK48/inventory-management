const app = require('express');
const router = app.Router();

const categoryController = require('../controllers/category');

router.post('/add', categoryController.createCategory);
router.get('/get', categoryController.getCategories);
router.put('/update', categoryController.updateCategory);
router.delete('/delete', categoryController.deleteCategory);

module.exports = router;