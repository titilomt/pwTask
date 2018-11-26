'use strict';
const util    = require('../util/util');
const express = require('express');
const router  = express.Router();

const postController = require('../controllers/postController');

// exemple Routes
router.get('/', util.verifyToken, postController.list_all_posts);

router.post('/', util.verifyToken, postController.post);

router.delete('/' , util.verifyToken, postController.delete_a_post);

router.put('/' , util.verifyToken, postController.update_a_post);

module.exports = router;