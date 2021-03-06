'use strict';
const util    = require('../util/util');
const express = require('express');
const router  = express.Router();

const grupoController = require('../controllers/grupoController');

router.post('/createGroup', util.verifyToken, grupoController.create_group);

router.delete('/deleteGroup', util.verifyToken, grupoController.delete_group);

router.put('/modifyGroup', util.verifyToken, grupoController.modify_group);

router.get('/', util.verifyToken, grupoController.get_group_by_name);

router.post('/joinGroup', util.verifyToken, grupoController.join_group);

router.delete('/leaveGroup', util.verifyToken, grupoController.leave_group);

router.get('/listGroups', util.verifyToken, grupoController.list_all_user_groups);

module.exports = router;