'use strict';
const modelSignup = require('../models/modelSignup');

exports.sing_up = (req, res) => {
    let expiration = new Date();
    expiration.setMonth(expiration.getMonth() + 1);

    const usuario = {
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        chave: "sadsafsaf342",
        expiracao: expiration,
        token: "token"
    };

    modelSignup.insert_user(usuario).then(ret => {
        res.status(200).send(ret);
    }).catch (err => {console.log(err); res.status(403).send(err)});
};