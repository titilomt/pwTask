'use strict';
const express = require('express');
const router  = express.Router();

const signupController = require('../controllers/signupController');

//POST 
router.post('/', signupController.sing_up);

module.exports = router;