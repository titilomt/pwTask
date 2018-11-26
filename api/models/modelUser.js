'use strict';
const db     = require('../util/dbconnection');
const bcrypt = require('bcrypt');
const util   = require('../util/util');

exports.insert_user = params => {

    const sql = "INSERT INTO usuario (nome, email, senha, chave, expiracao, token) VALUES (?) ";
    
    return new Promise ((res, rej) => {
        verify_email(params.email).then(data => {
            if (data.message === 'ok') {
                db.query(sql, [valuesToArray(params)], err => {
                    if(err) {
                        return rej (err);
                    }
                    return res (usuarioTemplate(params));
                });
            } else return rej (message);
        }).catch (err => {return rej(err);});
    });    
};

exports.delete_user = params => {
    const sql = "DELETE FROM usuario WHERE id = ? ";

    return new Promise ((resolve, rej) => {
        db.query(sql, [params], (err, result) => {

            if(err) return rej (err);
            if(result.affectedRows === 0 ) return resolve({message: "Nenhum usuário deletado..."});
            else {
                return resolve({message: "Usuario deletado com sucesso."});
            }
        });
    }).catch (err => {return rej(err);}); 
};

exports.update_user = params => {
    const sql = "UPDATE usuario SET nome = ?, senha = ? WHERE id = ? ";
    
    let newSenha = util.encrypt(params[3]);
    const templateUser = [
        params[1],
        newSenha,
        params[0]    
    ];

    return new Promise ((resolve, rej) => {
        verify_password(params[0], params[2]).then( ret=>{        
            if(ret.message === "ok") {
                db.query(sql, [templateUser[0],templateUser[1],templateUser[2]], (err, results) => {
                    
                    if(err) return rej({message: err});

                    if(results.affectedRows === 0) return resolve({erro: "0",message: "Usuario não encontrado."});
                    
                    return resolve({message: `Usuario ${templateUser[0]} atualizado com sucesso.`});
                });
            } else return rej(ret);
        }).catch(err => {return rej(err)});
    });
};

exports.forgot_password = (userEmail, newPassword) => {
    const sql = "UPDATE usuario SET senha = ? WHERE email = ? ";
    
    newPassword = util.encrypt(newPassword);
    
    return new Promise ((res, rej) => {
        verify_email(userEmail).then(data => {
            if (data.message !== "ok") {
                db.query(sql, [newPassword, userEmail], err => {
                    if(err) return rej(err);

                    return res("Senha alterada com sucesso.");
                });
            } else return rej(data);
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
            if (results.length > 0) {
                return res ({message: `Email ${userEmail} já cadastrado`});
            } 
            return res({message:"ok"});
        });
    }).catch(err => {return err;});
};

const verify_password = (userID, oldPassword) => {
    const sql = "SELECT senha FROM usuario WHERE id = ? ";
    
    return new Promise ((resolve, rej) => {
        db.query(sql, [userID], (err, results) => {
            if (err) throw err;
    
            if(results.length > 0){
                let resultJson = JSON.stringify(results[0]);
                resultJson = JSON.parse(resultJson);
                let match = bcrypt.compareSync(oldPassword, resultJson.senha);
                    
                if (match) return resolve({message: "ok"});
                
                else return rej({message: "Senha incorreta"});
            } else return rej({message: "Não encontrou um usuario"});    
        });
    });   
};

function usuarioTemplate (data){
    return {
        nome: data.nome,
        email: data.email,
        expiracao: data.expiracao,
        chave: data.chave
    };
};