'use strict';
const util    = require('../util/util');
const express = require('express');
const router  = express.Router();

const friendController = require('../controllers/friendController');

// exemple Routes
router.get('/:idOwner', util.verifyToken, friendController.list_all_friends);

router.get('/findFriend', util.verifyToken, friendController.search_friend); //auto complete find

router.delete('/:id', util.verifyToken, friendController.delete_a_friend);

router.post('/addFriend', util.verifyToken, friendController.add_friend);

router.post('/directMessage', util.verifyToken, friendController.send_direct);

router.post('/retriveMessage/:idDirect', util.verifyToken, friendController.retrive_direct);

module.exports = router;