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

    jwt.sign({usuarioTemplate}, usuarioTemplate.chave, (err, token) => {
        if (err) res.send(err);
        else {
            usuarioTemplate.token = token;

            modelUser.insert_user(usuarioTemplate).then(ret => {
                res.status(200).send({token: token, data: ret});
            }).catch (err => {res.status(403).send(err)});
        }
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
                
            jwt.sign({ret}, util.gen, (err, token) => {
                if (err) throw err;
                
                update_token(date, token, params[0]).then(ret => {
                    res.status(200).send({
                        token,
                        data: ret
                    });
                }).catch(err => {throw err});                
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

    jwt.verify(req.token, req.body.chave, (err, authData) => {
        if(err) res.send({message: "User Unauthorized!"});
    
        else {
            modelUser.delete_user(req.query.idOwner).then(ret => {
                console.log(ret);
                res.status(200).send({data: ret});
            }).catch (err => {console.log(err);res.status(403).send({erro: "Erro ao tentar remover"})});
        }
    });
};

exports.update_user = (req, res) => {

    const params = [
        req.query.idOwner,
        req.body.nome,
        req.body.oldSenha,
        req.body.newSenha
    ];

    jwt.verify(req.token, req.body.chave, (err, decode) => {
        if(err) {
            res.sendStatus(403);
        } else {
            modelUser.update_user(params).then(ret => {
                console.log(ret);
                if(ret.erro === 0) res.status(403).send({data:ret});

                else res.status(200).send({data: ret});

            }).catch(err => res.status(403).send({erro: err}));    
        }
    });
};

exports.forgot_password = (req, res) => {
    modelUser.forgot_password(req.body.email, req.body.senha).then(ret => {
        res.status(200).send(ret);
    }).catch (err => {res.status(403).send(err)});
};

async function update_token (date, token, id){
    return new Promise((resolve, reject) => {
        modelLogin.update_token(date, token, id).then(ret => {
            return resolve(ret);
        }).catch(err => { return reject(err); });
    });   
};