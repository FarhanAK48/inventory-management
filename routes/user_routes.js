
const express = require('express');  // Correct import
const router = express.Router();
const userContoller =  require('../controllers/user')

router.post('/', userContoller.addUser);
router.get('/', userContoller.getAllUsers);
router.get('/:userId', userContoller.findOneUSer);
router.put('/', userContoller.updateUser);
router.delete('/', userContoller.deleteUser);

module.exports =  router;
