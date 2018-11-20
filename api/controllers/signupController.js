'use strict';
const modelSignup = require('../models/modelSignup');
const jwt         = require('jsonwebtoken');
const util        = require ('../util/util');

exports.sing_up = (req, res) => {
    let expiration = new Date();
    expiration.setMonth(expiration.getMonth() + 1);

    let usuarioTemplate = {
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        chave: util.gen(),
        expiracao: expiration
    };

    jwt.sign({usuarioTemplate}, `${usuarioTemplate.chave }${expiration}`, (err, token) => {
        if (err) throw err;
        
        usuarioTemplate.token = token;
        
        modelSignup.insert_user(usuarioTemplate).then(ret => {
            res.status(200).send({token: token, data: ret});
        }).catch (err => {res.status(403).send(err)});
    });
};