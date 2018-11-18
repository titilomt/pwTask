const db = require('../util/dbconnection');

exports.auto_complete = userName => {
    const sql = "SELECT id, nome, email FROM usuario WHERE nome LIKE CONCAT( ?, '%')  ";

    return new Promise ((res, rej) => {
        db.query(sql, [userName], (err, results) => {
            if(err) return rej(err);
            
            let resultJson = JSON.stringify(results);
            resultJson = JSON.parse(resultJson);
            return res(resultJson);
        });
    });
};

exports.get_all_friends = userID => {
    const sql = `SELECT id, nome, email, id_direct FROM amigos 
                 WHERE (? = id_usuario_A OR ? = id_usuario_B) 
                 AND ativo`;

    return new Promise ((res, rej) => {
        db.query(sql, [userID], (err, results) => {
            if(err) return rej(err);
            
            let resultJson = JSON.stringify(results);
            resultJson = JSON.parse(resultJson);
            return res(resultJson);
        });
    });
};

exports.delete_friend = userID => {
    const sql = `UPDATE amigos SET ativo = false 
                 WHERE (? = id_usuario_A OR ? = id_usuario_B) `;

    return new Promise ((res, rej) => {
        db.query(sql, [userID], (err, results) => {
            if(err) return rej(err);
            
            let resultJson = JSON.stringify(results);
            resultJson = JSON.parse(resultJson);
            return res(resultJson);
        });
    });
};
