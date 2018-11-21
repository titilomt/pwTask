const db = require('../util/dbconnection');
const bcrypt = require('bcrypt');

exports.authentication = (user) => {
    const sql = "SELECT id_usuario, senha, nome, email, chave, token, expiracao FROM usuario WHERE email = ? ";
    
    return new Promise ((res, rej) => {
        db.query(sql, [user[0]], (err, results) => {
            if(err) return rej(err);
            let resultJson = JSON.stringify(results[0]);
            resultJson = JSON.parse(resultJson);
            if(results.length > 0) {
                bcrypt.compare(user[1], resultJson.senha, (err, ret)=> {
                    if (err) return rej(err);
                    
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

exports.update_token = (date, token, id) => {
    
    const sql = "UPDATE usuario SET token = ?, expiracao = ? WHERE id = ? ";
    let params = [date, token, id];
    db.query(sql, [params], err => {
        if(err) return err;

        return {status:200, token};
    });
};