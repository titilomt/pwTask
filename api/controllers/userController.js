'use strict';
const modelUser = require('../models/modelUser');
const modelLogin = require('../models/modelLogin');
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
        
        modelUser.insert_user(usuarioTemplate).then(ret => {
            res.status(200).send({token: token, data: ret});
        }).catch (err => {res.status(403).send(err)});
    });
};

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
                update_token(date, token, params[0]);
    
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

exports.delete_user = (req, res) => {

    jwt.verify(req.token, `${req.body.chave}${req.body.expiracao}`, (err, authData) => {
        if(err) res.sendStatus(403);
        modelUser.delete_user(req.params.idOwner).then(ret => {
            res.status(200).send(ret);
        }).catch (err => {res.status(403).send(err)});
    });
};

exports.update_user = (req, res) => {
    
    const params = [
        req,params.idOwner,
        req.body.nome,
        req.body.oldSenha,
        req.body.newSenha
    ];

    jwt.verify(req.token, `${req.body.chave}${req.body.expiracao}`, (err, authData) => {
        if(err) res.sendStatus(403);
        
        modelUser.update_user(params).then(ret => {
            res.status(200).send(ret);
        }).catch (err => {res.status(403).send(err)});
    });
};

exports.forgot_password = (req, res) => {
    modelUser.forgot_password(req.body.email, req.body.senha).then(ret => {
        res.status(200).send(ret);
    }).catch (err => {res.status(403).send(err)});
};

function update_token (date, token, id){
    modelLogin.update_token(date, token, id);
}