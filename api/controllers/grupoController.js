'use strict';
const modelGroup = require('../models/modelGroup');
const jwt         = require('jsonwebtoken');

exports.create_group = (req, res) => {
    let date = new Date();
    
    const groupTemplate = {
        id_owner: req.body.userID,
        nome: req.body.nome,
        date
    };

    const id_user = groupTemplate.id_owner;
    
    jwt.verify(req.token, `${req.body.chave}${req.body.expiracao}`, (err, authData) => {
        if(err) res.sendStatus(403);
        Promise.resolve().then( ret=> {
            modelGroup.insert_group(groupTemplate);    
            res.status(200).send({status: 200, data: ret});
        }).then( _=>{
            modelGroup.get_group_by_id(id_user).then(data => {
                params = [
                    id_user,
                    data,
                    5
                ];

                modelGroup.insert_list_grupo(params).then(ret => {
                    res.status(200).send(ret);
                }).catch (err => {res.status(403).send(err)});
            }).catch (err => {res.status(403).send(err)});
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

exports.join_group = (req, res) => {
    const params = [
        req.body.id_user,
        req.body.id_grupo
    ];
    
    jwt.verify(req.token, `${req.body.chave}${req.body.expiracao}`, (err, authData) => {
        if(err) res.sendStatus(403);
        
        modelGroup.join_group(params).then(ret => {
            res.status(200).send(ret);
        }).catch(err => res.status(404).send(err));
    });
};

exports.leave_group = (req, res) => {
    const params = [
        req.body.id_user,
        req.body.id_grupo
    ];
    
    jwt.verify(req.token, `${req.body.chave}${req.body.expiracao}`, (err, authData) => {
        if(err) res.sendStatus(403);
        
        modelGroup.leave_group(params).then(ret => {
            res.status(200).send(ret);
        }).catch(err => res.status(404).send(err));
    });
};

exports.list_all_user_groups = (req, res) => {
    const params = req.params.idUser;

    jwt.verify(req.token, `${req.body.chave}${req.body.expiracao}`, (err, authData) => {
        if(err) res.sendStatus(403);
        
        modelGroup.list_all_user_groups(params).then(ret => {
            res.status(200).send(ret);
        }).catch(err => res.status(404).send(err));
    });
};