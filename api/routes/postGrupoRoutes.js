'use strict';
const util    = require('../util/util');
const express = require('express');
const router  = express.Router();

const postGrupoController = require('../controllers/postGrupoController');

// exemple Routes
router.get('/', util.verifyToken, postGrupoController.list_all_posts);

router.post('/', util.verifyToken, postGrupoController.post_gruop);

router.delete('/:idOwner/:idPost' , util.verifyToken, postGrupoController.delete_a_post);

router.put('/:id' , util.verifyToken, postGrupoController.update_a_post);

module.exports = router;