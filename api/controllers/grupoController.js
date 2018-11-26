'use strict';
const modelGroup = require('../models/modelGroup');
const jwt        = require('jsonwebtoken');
const util       = require('../util/util');

exports.create_group = (req, res) => {
    let date = new Date();
    
    const groupTemplate = {
        id_owner: req.body.id_owner,
        nome: req.body.nome,        
        chave: util.gen(),
        date,
        img: req.body.img,
        privacidade: req.body.privacidade
    };

    const id_user = groupTemplate.id_owner;
    const chaveGrupo = groupTemplate.chave;
    
    jwt.verify(req.token, req.body.chave, (err, authData) => {
        if(err) res.sendStatus(403);
        else {
            modelGroup.insert_group(groupTemplate).then( _=>{
                modelGroup.get_group_id(id_user, chaveGrupo).then(data => {
                    if(data) {
                        let params = [
                            id_user,
                            data[0].id,
                            5
                        ];        
                        modelGroup.insert_list_grupo(params).then(ret => {
                            res.status(200).send({message: ret});
                        }).catch (err => {res.status(403).send(err)});
                    } else res.status(404).send({message:"Não foi possivel criar o grupo."});                    
                }).catch (err => {console.log(err);res.status(402).send({message:err})});
            }).catch (err => {res.status(403).send({message:err})});
        }
    });
};

exports.delete_group = (req, res) => {
    const params = [
        req.query.grupo_id,
        req.query.owner_id
    ];
    
    jwt.verify(req.token, req.body.chave, (err, authData) => {
        if(err) res.sendStatus(403);
        else {
            modelGroup.delete_group(params).then(ret => {
                res.status(200).send(ret);
            }).catch (err => {res.status(403).send(err)});
        }
    });
};

exports.modify_group = (req, res) => {
    
    const params = [
        req.body.nome,
        req.body.img,
        req.query.owner_id,
        req.query.grupo_id
    ];
    
    jwt.verify(req.token, req.body.chave, (err, authData) => {
        if(err) res.sendStatus(403);
        else {
            modelGroup.update_group(params).then(ret => {
                res.status(200).send(ret);
            }).catch (err => {res.status(403).send(err)});
        }
    });
};

exports.get_group_by_name = (req, res) => {
    
    const needle = req.body.nome;

    if (needle.length < 2) { res.send([]) }
    
    else {
        jwt.verify(req.token, req.body.chave, (err, authData) => {
            if(err) res.sendStatus(403);
        
            else {
                modelGroup.get_group_by_name(needle.toLowerCase()).then(ret => {
                    res.send({ linesFound: ret.length, data: ret});
                }).catch(err => res.status(404).send(err));
            }
        });
    }
};

exports.join_group = (req, res) => {
    const params = [
        req.body.id_user,
        req.body.id_grupo
    ];
    
    jwt.verify(req.token, req.body.chave, (err, authData) => {
        if(err) res.sendStatus(403);
        
        else {
            modelGroup.join_group(params).then(ret => {
                res.status(200).send(ret);
            }).catch(err => res.status(404).send(err));
        }
    });
};

exports.leave_group = (req, res) => {
    const params = [
        req.body.id_user,
        req.body.id_grupo
    ];
    
    jwt.verify(req.token, req.body.chave, (err, authData) => {
        if(err) res.sendStatus(403);
        
        else {
            modelGroup.leave_group(params).then(ret => {
                res.status(200).send(ret);
            }).catch(err => res.status(404).send(err));
        }
    });
};

exports.list_all_user_groups = (req, res) => {
    const params = req.params.idUser;

    jwt.verify(req.token, req.body.chave, (err, authData) => {
        if(err) res.sendStatus(403);
        
        else {
            modelGroup.list_all_user_groups(params).then(ret => {
                res.status(200).send(ret);
            }).catch(err => res.status(404).send(err));    
        }
    });
};