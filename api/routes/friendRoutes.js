'use strict';
const express = require('express');
const router  = express.Router();

const friendController = require('../controllers/friendController');

// exemple Routes
router.get('/:id', friendController.list_all_friends);

router.post('/:nome', friendController.search_friend); //auto complete find

router.delete('/:id' ,friendController.delete_a_friend);

module.exports = router;