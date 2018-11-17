const db = require('../util/dbconnection');
const util = require('../util/util');
const bcrypt = require('bcrypt');

exports.forgot_password = (userEmail) => {
    sql = "SELECT email, senha FROM usuario WHERE email = (?) ";

    return new Promise ((res, rej) => {
        db.query(sql, [userEmail], (err, results) => {
            if(err) return rej(err);
            
            let resultJson = JSON.stringify(results);
            resultJson = JSON.parse(resultJson);
            return res(resultJson);
        });
    });
};

exports.authentication = (user) => {
    sql = "SELECT id, senha, nome, email, chave FROM usuario WHERE email = ? ";
    
    return new Promise ((res, rej) => {
        db.query(sql, [user[0]], (err, results) => {
            if(err) return rej(err);
            let resultJson = JSON.stringify(results[0]);
            resultJson = JSON.parse(resultJson);
            if(results.length > 0) {
                bcrypt.compare(user[1], resultJson.senha, (err, ret)=> {
                    if(ret) {
                        // Passwords match                
                        delete resultJson.senha;
                        return res(resultJson);   
                    } else {
                        return rej ('Password or email invalid.');
                    }
                });
            } else {
                // Passwords don't match
                return rej ('Password or email invalid.');
            }
        });
    }).catch(err => {return err;});
};