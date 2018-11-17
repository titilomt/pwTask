'use strict'
const db = require('../util/dbconnection');

exports.insert_user = params => {

    let sql = "INSERT INTO usuario (nome, email, senha, chave, expiracao, token) VALUES (?) ";
    
    return new Promise ((res, rej) => {
        db.query(sql, [params], err => {
            if(err) {
                return rej (err);
            }    
            return res ({"token" : params.token});
        });
    });    
};