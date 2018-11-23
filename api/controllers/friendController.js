'use strict';
const modelFriend = require('../models/modelFriend');
const jwt         = require('jsonwebtoken');

exports.add_friend = (req, res) => {
    let date = new Date();

    const params = [
        req.body.id_usuario,
        req.body.id_amigo,
        true,
        date        
    ];

    jwt.verify(req.token, `${req.body.chave}${req.body.expiracao}`, (err, authData) => {
        if(err) res.sendStatus(403);

        modelGroup.add_friend(params).then(ret => {
            res.status(200).send({status: 200, data: ret});
        }).catch (err => {res.status(403).send(err)});
    });
};

exports.search_friend = (req, res) => {
    
    const needle = req.body.nome;

    if (needle.length < 2) { res.send([]) }
    else {
        jwt.verify(req.token, `${req.body.chave}${req.body.expiracao}`, (err, authData) => {
            if(err) res.sendStatus(403);
            
            modelFriend.auto_complete(needle.toLowerCase()).then(ret => {
                res.send({ linesFound: ret.length, data: ret});
            }).catch(err => res.status(404).send(err));
        });
    }
};

exports.list_all_friends = (req, res) => {
    
    const userID = req.params.idOwner;

    jwt.verify(req.token, `${req.body.chave}${req.body.expiracao}`, (err, authData) => {
        if(err) res.sendStatus(403);
        
        modelFriend.get_all_friends(userID).then(ret => {
            res.status(200).send(ret);
        }).catch (err => res.status(404).send(err));
    });
};

exports.delete_a_friend = (req, res) => {
    
    const userID = req.params.id;
    
    jwt.verify(req.token, `${req.body.chave}${req.body.expiracao}`, (err, authData) => {
        if(err) res.sendStatus(403);
        
        modelFriend.delete_friend(userID).then(ret => {
            res.status(200).send(ret);
        }).catch(err => res.status(404).send(err));
    });
};

exports.send_direct = (req, res) => {
    let date = new Date();
    const params = [
        req.body.id_amigos,
        req.body.nome,
        req.body.text,
        date
    ];

    jwt.verify(req.token, `${req.body.chave}${req.body.expiracao}`, (err, authData) => {
        if(err) res.sendStatus(403);
        modelFriend.send_direct(params).then(ret => {
            res.status(200).send(ret);
        }).catch(err => res.status(404).send(err));
    });
};

exports.retrive_direct = (req, res) => {
    let date = new Date();    
    date.setMonth(date.getMonth() - req.body.months);
    
    const params = [
        req.params.idDirect,
        req.body.id_amigos,
        date
    ];

    jwt.verify(req.token, `${req.body.chave}${req.body.expiracao}`, (err, authData) => {
        if(err) res.sendStatus(403);
        modelFriend.retrive_direct(params).then(ret => {
            res.status(200).send(ret);
        }).catch(err => res.status(404).send(err));
    });
};