'use strict';
const modelLogin = require('../models/modelLogin');
const jwt = require('jsonwebtoken');

exports.authentication = (req, res) => {
    let params = [
        req.body.email,
        req.body.senha
    ];

    modelLogin.authentication(params).then(ret => {
        let today = new Date();
        if(today > ret.expiracao) { // gerar novo token
            let date = today.setMonth(today.getMonth() + 1);
                
            jwt.sign({ret}, `${ret.chave}${date}`, (err, token) => {
                if (err) throw err;
                update_token(date, token);
    
                res.status(200).send({
                    token,
                    data: ret
                });
            });
        } else {
            let token = ret.token;
            delete ret.token;
            res.status(200).send({
                token,
                data: ret
            });
        }
    }).catch(err => res.status(403).send(err));
};

function update_token (date, token){
    modelLogin.update_token(date, token);
}