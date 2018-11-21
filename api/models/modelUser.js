'use strict'
const db   = require('../util/dbconnection');
const bcrypt = require('bcrypt');
const util = require('../util/util');

exports.insert_user = params => {

    const sql = "INSERT INTO usuario (nome, email, senha, chave, expiracao, token) VALUES (?) ";
    
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

exports.delete_user = params => {
    const sql = "DELETE usuario WHERE id_usuario = ? ";

    return new Promise ((res, rej) => {
        db.query(sql, [params], err => {
            if(err) return rej (err);

            return res ({status: 200, message: "Usuario deletado com sucesso."});
        }).catch (err => {return err;});
    }); 
};

exports.update_user = params => {
    const sql = "UPDATE usuario SET nome = ?, senha = ? WHERE id_usuario = ? ";
    
    newSenha = util.encrypt(params[3]);

    const templateUser = [
        params[1],
        newSenha,
        params[0]    
    ];
    
    return new Promise ((res, rej) => {
        verify_password(params[0], params[2]).then(ret => {
            if(ret === "ok") {
                db.query(sql, [templateUser], err => {            
                    if(err) return rej (err);
                    let resultJson = JSON.stringify(results[0]);
                    resultJson = JSON.parse(resultJson);
                    return res (`Usuario ${templateUser[0]} atualizado com sucesso.`);
                }).catch (err => {return err;});                
            } else return rej("Senha incorreta.");
        });
    }); 
};

exports.forgot_password = (userEmail, newPassword) => {
    const sql = "UPDATE usuario SET senha = ? WHERE email = ? ";
    
    newPassword = util.encrypt(newPassword);
    
    return new Promise ((res, rej) => {
        verify_email(userEmail).then(message => {
            if (message === "ok") {
                db.query(sql, [newPassword, userEmail], err => {
                    if(err) return rej(err);

                    return res("Senha alterada com sucesso.");
                });
            } else return rej(message);
        });
    });
};

function valuesToArray(obj) {
    return Object.keys(obj).map( key => { 
        
        if(key === 'senha') {
            return util.encrypt(obj[key]);
        }
        return obj[key]; 
    });
};

function verify_email (userEmail) {
    const sql = "SELECT nome, email FROM usuario WHERE email = ? ";
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

function verify_password (userID, oldPassword) {
    const sql = "SELECT senha FROM usuario WHERE id_usuario = ? ";
    oldPassword = util.encrypt(oldPassword);

    return new Promise ((res, rej) => {
        db.query(sql, [userID], (err, results) => {
            if(err) return rej(err);

            let resultJson = JSON.stringify(results[0]);
            resultJson = JSON.parse(resultJson);

            bcrypt.compare(oldPassword, resultJson.senha, (err)=> {
                if(err) return rej (err);

                return res ("ok");
            });
        });
    }).catch(err => {return err;});
};

function usuarioTemplate (data){
    return {
        nome: data.nome,
        email: data.email,
        expiracao: data.expiracao
    };
};