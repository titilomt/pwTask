'use strict';
const util    = require('../util/util');
const express = require('express');
const router  = express.Router();

const userController = require('../controllers/userController');

//POST 
router.post('/', userController.sing_up);

router.post('/login', userController.authentication);

router.delete('/deleteUser', util.verifyToken, userController.delete_user);

router.put('/updateUser', util.verifyToken, userController.update_user);

router.put('/forgetPassword', userController.forgot_password);

module.exports = router;