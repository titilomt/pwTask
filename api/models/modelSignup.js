'use strict'
const db   = require('../util/dbconnection');
const util = require('../util/util');

exports.insert_user = params => {

    let sql = "INSERT INTO usuario (nome, email, senha, chave, expiracao, token) VALUES (?) ";
    
    return new Promise ((res, rej) => {
        verify_email(params.email).then(message => {
            if (message === 'ok') {
                db.query(sql, [valuesToArray(params)], err => {
                    if(err) {
                        return rej (err);
                    }

                    return res (usuarioTemplate(params));
                });
            } else return rej (message);        
        }).catch (err => {return err;});
    });    
};

function valuesToArray(obj) {
    return Object.keys(obj).map( key => { 
        
        if(key === 'senha') {
            return util.encrypt(obj[key]);
        }
        return obj[key]; 
    });
}

function verify_email (userEmail) {
    let sql = "SELECT nome, email FROM usuario WHERE email = (?) LIMIT 0,1 ";
    return new Promise ((res, rej) => {
        db.query(sql, [userEmail], (err, results) => {
            if(err) return rej(err);
            if (!!results && results.length > 0) {
                let resultJson = JSON.stringify(results[0]);
                resultJson = JSON.parse(resultJson);
                return rej (`Email ${resultJson.email} já cadastrado`);
            } 
            return res('ok');
        });
    }).catch(err => {return err;});
};

function usuarioTemplate (data){
    return {
        nome: data.nome,
        email: data.email,
        expiracao: data.expiracao
    };
}