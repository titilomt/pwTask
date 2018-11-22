'use strict';
const util    = require('../util/util');
const express = require('express');
const router  = express.Router();

const profileController = require('../controllers/profileController');

router.post('/createProfile', util.verifyToken, profileController.create_profile);

router.delete('/deleteProfile', util.verifyToken, profileController.delete_profile);

router.put('/modifyProfile', util.verifyToken, profileController.modify_profile);

router.get('/', util.verifyToken, profileController.get_profile_by_id);

module.exports = router;