'use strict';
const modelPost = require('../models/modelPost');
const jwt         = require('jsonwebtoken');

exports.post = (req, res) => {
    let date = new Date();
    let params = [
        req.body.owner_id,
        req.body.nome,
        date,
        req.body.text,
        req.body.img,
        req.body.visualizacao 
    ];
    
    jwt.verify(req.token, req.body.chave, (err, authData) => {
        if(err) res.sendStatus(403);

        else {
            modelPost.post(params).then(ret => {
                res.status(200).send({ status: 'success', data: ret});
            }).catch(err => res.status(403).send(err));
        }
    });
    
};

exports.list_all_posts = (req, res) => {

    jwt.verify(req.token, req.body.chave, (err, authData) => {
        if(err) res.sendStatus(403);
        else {
            modelPost.list_all_posts(req.body.userID).then(ret => {
                res.status(200).send(ret);
            }).catch (err => res.status(404).send(err));
        }        
    });
};

exports.delete_a_post = (req, res) => {

    const params = [
        req.query.idOwner,
        req.query.idPost
    ];

    jwt.verify(req.token, req.body.chave, (err, authData) => {
        if(err) res.sendStatus(403);
        else{
            modelPost.delete_post(params).then(ret => {
                res.status(200).send(ret);
            }).catch(err => res.status(404).send(err));
        }        
    });
};

exports.update_a_post = (req, res) => {

    const params = [
        req.body.text,
        req.body.img,
        req.query.idOwner,
        req.query.idPost,
        req.body.visualizacao
    ];

    jwt.verify(req.token, req.body.chave, (err, authData) => {
        if(err) res.sendStatus(403);
        else {
            modelPost.update_post(params).then(ret => {
                res.status(200).send(ret);
            }).catch(err => res.status(404).send(err));    
        }
    });
};