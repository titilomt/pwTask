'use strict';
const modelGroup = require('../models/modelGroup');
const jwt         = require('jsonwebtoken');

exports.create_group = (req, res) => {
    let date = new Date();
    
    let groupTemplate = {
        id_owner: req.body.userID,
        nome: req.body.nome,
        date
    };
    
    jwt.verify(req.token, `${req.body.chave}${req.body.expiracao}`, (err, authData) => {
        if(err) res.sendStatus(403);

        modelGroup.insert_group(groupTemplate).then(ret => {
            res.status(200).send({status: 200, data: ret});
        }).catch (err => {res.status(403).send(err)});
    });
};

exports.delete_group = (req, res) => {
    const params = [
        req.params.idOwner,
        req.params.idGrupo
    ];
    
    jwt.verify(req.token, `${req.body.chave}${req.body.expiracao}`, (err, authData) => {
        if(err) res.sendStatus(403);

        modelGroup.delete_group(params).then(ret => {
            res.status(200).send(ret);
        }).catch (err => {res.status(403).send(err)});
    });
};

exports.modify_group = (req, res) => {
    
    const params = [
        req.body.nome,
        req.body.img,
        req.params.idOwner,
        req.params.idGrupo
    ];
    
    jwt.verify(req.token, `${req.body.chave}${req.body.expiracao}`, (err, authData) => {
        if(err) res.sendStatus(403);
    
        modelGroup.update_group(params).then(ret => {
            res.status(200).send(ret);
        }).catch (err => {res.status(403).send(err)});
    });
};

exports.get_group_by_name = (req, res) => {
    const needle = req.body.nome;

    if (needle.length < 2) { res.send([]) }
    
    else {
        jwt.verify(req.token, `${req.body.chave}${req.body.expiracao}`, (err, authData) => {
            if(err) res.sendStatus(403);
        
            modelGroup.get_group_by_name(needle.toLowerCase()).then(ret => {
                res.send({ linesFound: ret.length, data: ret});
            }).catch(err => res.status(404).send(err));
        });
    }
};