'use strict';
const modelPost = require('../models/modelPost');
const jwt         = require('jsonwebtoken');

exports.post = (req, res) => {
    let date = new Date();
    params = [
        req.body.ownerID,
        req.body.nome,
        date,
        req.body.text,
        req.body.img,
        req.body.visualizacao 
    ];
    
    jwt.verify(req.token, `${req.body.chave}${req.body.expiracao}`, (err, authData) => {
        if(err) res.sendStatus(403);

        modelPost.do_post(params).then(ret => {
            res.status(200).send({ status: 'success', data: ret});
        }).catch(err => res.status(403).send(err));
    });
    
};

exports.list_all_posts = (req, res) => {

    jwt.verify(req.token, `${req.body.chave}${req.body.expiracao}`, (err, authData) => {
        modelPost.get_all_posts(req.body.userID).then(ret => {
            res.status(200).send(ret);
        }).catch (err => res.status(404).send(err));
    });
};

exports.delete_a_post = (req, res) => {

    const params = [
        req.body.ownerID,
        req.body.postID
    ];

    jwt.verify(req.token, `${req.body.chave}${req.body.expiracao}`, (err, authData) => {
        if(err) res.sendStatus(403);

        modelPost.delete_post(params).then(ret => {
            res.status(200).send(ret);
        }).catch(err => res.status(404).send(err));
    });
};

exports.update_a_post = (req, res) => {

    const params = [
        req.body.text,
        req.body.img,
        req.body.ownerID,
        req.body.postID,
        req.body.visualizacao
    ];

    jwt.verify(req.token, `${req.body.chave}${req.body.expiracao}`, (err, authData) => {
        if(err) res.sendStatus(403);

        modelPost.update_post(params).then(ret => {
            res.status(200).send(ret);
        }).catch(err => res.status(404).send(err));
    });
};