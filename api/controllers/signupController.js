'use strict';
const modelSignup = require('../models/modelSignup');

exports.sign_up = (req, res) => {
    let d = new Date();
    d.setMonth(d.getMonth() + 1);

    let token = '343dff33d3gg3';
    
    const params = [
        req.body.nome,
        req.body.email,
        req.body.senha,
        "sadsafsaf342",
        d,
        token
    ];

    modelSignup.insert_user(params).then(ret => {
        res.status(200).send(ret);
    }).catch (err => res.status(505).send(err));
};