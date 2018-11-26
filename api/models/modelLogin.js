const db = require('../util/dbconnection');
const bcrypt = require('bcrypt');

exports.authentication = (params) => {
    const sql = "SELECT id, senha, nome, email, chave, token, expiracao FROM usuario WHERE email = ? ";
    
    return new Promise ((res, rej) => {
        db.query(sql, [params[0]], (err, results) => {
            if(err) return rej(err);
            if(results.length > 0) {
                let resultJson = JSON.stringify(results[0]);
                resultJson = JSON.parse(resultJson);
                
                bcrypt.compare(params[1], resultJson.senha, (err, ret)=> {
                    if (err) {
                        return rej(err);
                    }
                    console.log(params[1]);
                    if(ret) {
                        // Passwords match                
                        delete resultJson.senha;
                        return res(resultJson);   
                    } else {
                        return rej ('Password or email invalid.');
                    }
                });
            } else {
                // Email don't match
                return rej ('Password or email invalid.');
            }
        });
    }).catch(err => {return err;});
};

exports.update_token = (date, token, id) => {
    
    const sql = "UPDATE usuario SET token = ?, expiracao = ? WHERE id = ? ";
    let params = [date, token, id];
    
    return new Promise ((resolve, rej) => {
        db.query(sql, [params], err => {
            if(err) return rej(err);

            return resolve({status:200, token});
        });
    }).catch(err => {return err;});
};