const db = require('../util/dbconnection');

exports.do_login = (userID) => {
    sql = "SELECT * FROM usuario WHERE id = (?) ";

    return new Promise ((res, rej) => {
        db.query(sql, [userID], (err, results) => {
            if(err) return rej(err);
            
            let resultJson = JSON.stringify(results);
            resultJson = JSON.parse(resultJson);
            return res(resultJson);
        });
    });
};

exports.forgot_passqord = (userEmail) => {
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