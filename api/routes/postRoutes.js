'use strict';
const express = require('express');
const router  = express.Router();
const util    = require('../util/util');

const postController = require('../controllers/postController');

// exemple Routes
router.get('/', util.verifyToken, postController.list_all_posts);

router.post('/', util.verifyToken, postController.post);

router.delete('/:id' , util.verifyToken, postController.delete_a_post);

router.put('/:id' , util.verifyToken, postController.update_a_post);

module.exports = router;