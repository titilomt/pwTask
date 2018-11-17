'use strict';
const modelLogin = require('../models/modelLogin');
const jwt = require('jsonwebtoken');

exports.authentication = (req, res) => {
    let params = [
        req.body.email,
        req.body.senha
    ];

    modelLogin.authentication(params).then(ret => {
        jwt.sign({ret}, ret.chave, (err, token) => {
            if (err) throw err;

            res.status(200).send({
                token
            });
        });
    }).catch(err => res.status(403).send(err));
};