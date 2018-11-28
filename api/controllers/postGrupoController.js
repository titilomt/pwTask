'use strict';
const modelPostGrupo = require('../models/modelPostGrupo');
const jwt            = require('jsonwebtoken');

exports.post_group = (req, res) => {
    let date = new Date();
    const params = [
        req.body.owner_id,
        req.body.group_id,
        req.body.nome,
        date,
        req.body.text,
        req.body.img
    ];
    
    jwt.verify(req.token, req.body.chave, (err, authData) => {
        if(err) res.sendStatus(403);

        else {
            modelPostGrupo.post_group(params).then(ret => {
                res.status(200).send({ status: 'success', data: ret});
            }).catch(err => res.status(403).send(err));
        }        
    });
    
};

exports.list_all_posts = (req, res) => {

    jwt.verify(req.token, req.body.chave, (err, authData) => {
        if(err) res.sendStatus(403);
        
        else {
            modelPostGrupo.list_all_posts(req.query.id_grupo).then(ret => {
                res.status(200).send(ret);
            }).catch (err => res.status(404).send(err));
        }
    });
};

exports.delete_a_post = (req, res) => {

    const params = [
        req.body.id_owner,
        req.query.id_grupo,
        req.query.id_post
    ];

    console.log(params)

    jwt.verify(req.token, req.body.chave, (err, authData) => {
        if(err) res.sendStatus(403);

        else {
            modelPostGrupo.delete_post(params).then(ret => {
                res.status(200).send(ret);
            }).catch(err => res.status(404).send(err));
        }
    });
};

exports.update_a_post = (req, res) => {

    const params = [
        req.body.text,
        req.body.img,
        req.body.id_owner,
        req.body.id_post
    ];

    jwt.verify(req.token, req.body.chave, (err, authData) => {
        if(err) res.sendStatus(403);

        else {
            modelPostGrupo.update_post(params).then(ret => {
                res.status(200).send(ret);
            }).catch(err => res.status(404).send(err));
        }
    });
};