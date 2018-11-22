'use strict';
const modelProfile = require('../models/modelProfile');

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

    modelProfile.create_profile(params).then(ret => {
        res.status(200).send({status: 200, data: ret});
    }).catch (err => {res.status(403).send(err)});
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
        req.body.id
    ];

    modelProfile.modify_profile(params).then(ret => {
        res.send({ status: 200, data: ret});
    }).catch(err => res.status(403).send(err));    
};

exports.get_profile_by_id = (req, res) => {
    
    const userID = req.body.id;

    modelProfile.get_profile_by_id(userID).then(ret => {
        res.status(200).send(ret);
    }).catch (err => res.status(404).send(err));
};

exports.delete_profile = (req, res) => {
    
    const userID = req.body.id;
    
    modelProfile.delete_profile(userID).then(ret => {
        res.status(200).send(ret);
    }).catch(err => res.status(404).send(err));
};