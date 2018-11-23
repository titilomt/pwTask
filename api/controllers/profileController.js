'use strict';
const modelProfile = require('../models/modelProfile');
const jwt          = require('jsonwebtoken');

exports.create_profile = (req, res) => {

    const params = [
        req.body.id_owner,
        req.body.nome,
        req.body.dt_nascimento,
        req.body.escolaridade,
        req.body.relacionamento_status,
        req.body.background_img,
        req.body.perfil_img,
        req.body.privacidade
    ];

    jwt.verify(req.token, `${req.body.chave}${req.body.expiracao}`, (err, authData) => {
        if(err) res.sendStatus(403);

        modelProfile.create_profile(params).then(ret => {
            res.status(200).send({status: 200, data: ret});
        }).catch (err => {res.status(403).send(err)});
    });
};

exports.modify_profile = (req, res) => {
    
    const params = [        
        req.body.nome,
        req.body.dt_nascimento,
        req.body.escolaridade,
        req.body.relacionamento_status,
        req.body.background_img,
        req.body.perfil_img,
        req.body.privacidade,
        req.params.idOwner,
        req.params.idProfile
    ];
    jwt.verify(req.token, `${req.body.chave}${req.body.expiracao}`, (err, authData) => {
        if(err) res.sendStatus(403);

        modelProfile.modify_profile(params).then(ret => {
            res.send({ status: 200, data: ret});
        }).catch(err => res.status(403).send(err));    
    });
};

exports.get_profile_by_id = (req, res) => {
    
    const userID = req.params.idOwner;
    
    jwt.verify(req.token, `${req.body.chave}${req.body.expiracao}`, (err, authData) => {
        if(err) res.sendStatus(403);
        modelProfile.get_profile_by_id(userID).then(ret => {
            res.status(200).send(ret);
        }).catch (err => res.status(404).send(err));
    });
};

exports.delete_profile = (req, res) => {
    
    const params =[
        req.params.idOwner,
        req.params.idProfile
    ];

    jwt.verify(req.token, `${req.body.chave}${req.body.expiracao}`, (err, authData) => {
        if(err) res.sendStatus(403);
        modelProfile.delete_profile(params).then(ret => {
            res.status(200).send(ret);
        }).catch(err => res.status(404).send(err));
    });
};