'use strict';
const db   = require('../util/dbconnection');

exports.validate_token = (userID) =>  {
    const sql = "SELECT token, expiracao FROM usuario WHERE id_usuario = ? ";
    return new Promise ((res, rej) => {
        db.query(sql, [userID], (err, results) => {
            if(err) return rej(err);
            if (results.length > 0) {
                let resultJson = JSON.stringify(results[0]);
                resultJson = JSON.parse(resultJson);
                return rej (resultJson);
            } 
            return res({status: 404, messagem: 'Usuario não encontrado'});
        });
    }).catch(err => {return err;});
};