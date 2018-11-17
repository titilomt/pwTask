'use strict';
const express = require('express');
const router  = express.Router();

const loginController = require('../controllers/loginController');

// exemple Routes
//GET
router.get('/', loginController.do_login);

router.get('/forgetPassword/:email', loginController.forget_password);

module.exports = router;