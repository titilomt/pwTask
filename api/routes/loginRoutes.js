'use strict';
const express = require('express');
const router  = express.Router();

const loginController = require('../controllers/loginController');

// exemple Routes
//GET
router.post('/', loginController.authentication);

//router.get('/forgetPassword/:email', loginController.forget_password);

module.exports = router;