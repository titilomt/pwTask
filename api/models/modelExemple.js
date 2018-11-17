const db = require('../models/dbconnection');

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

exports.get_all_users = _=> {
    let resultJson = '';
    let sql = "SELECT id, nome, email FROM usuario ";

    return new Promise ((res, rej) => {
        db.query(sql, [], (err, results) => {
            if(err) {
                return rej(err);
            }
            resultJson = JSON.stringify(results);
            resultJson = JSON.parse(resultJson);
            
            return res(resultJson);
        });
    });    
};

exports.get_one_user = params => {

    let sql = "SELECT id, nome, email FROM usuario WHERE TO_LOWER(nome) LIKE TO_LOWER(CONCAT( ??, '%' )) ";
    
    return new Promise ((res, rej) => {
        db.query(sql, [params], (err, results)=> {
            if(err) {
                return rej(err);
            }

            let resultJson = JSON.stringify(results);
            resultJson = JSON.parse(resultJson);
            
            return res(resultJson);
        });
    });
};