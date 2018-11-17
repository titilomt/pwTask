'use strict';
const express = require('express');
const router  = express.Router();

const exempleController = require('../controllers/exempleController');

// exemple Routes
router.get('/', exempleController.list_all_users);

router.get('/exemple/:nome', exempleController.exemple_retrive_user);

// app.route('/exemple/:taskId')
//     .get(exempleController.read_a_task)
//     .put(exempleController.update_a_task)
//     .delete(exempleController.delete_a_task);

module.exports = router;