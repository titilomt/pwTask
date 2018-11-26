'use strict';
const db = require('../util/dbconnection');

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

    let sql = "SELECT id, nome, email FROM usuario WHERE LOWER(nome) LIKE LOWER(CONCAT( ??, '%' )) ";
    
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