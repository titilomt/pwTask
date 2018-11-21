const db = require('../util/dbconnection');

exports.add_friend = params => {
    const sql = "INSERT INTO amigos (id_usuarioA, id_usuarioB,  token) VALUES (?) ";
    
    return new Promise ((res, rej) => {
        verify_user_friend(params[1]).then(message => {
            if (message === 'ok') {
                db.query(sql, [params], err => {
                    if(err) return rej (err);
                    return res ("Agora vuces sao miguxos.");
                });
            } else return rej (message);        
        }).catch (err => {return err;});
    });
}

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
                 WHERE id_usuarioA = ? 
                 OR id_usuarioB = ? 
                 AND ativo`;

    return new Promise ((res, rej) => {
        db.query(sql, [userID, userID], (err, results) => {
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

function verify_user_friend (userID) {
    const sql = "SELECT u.nome FROM amigos a JOIN usuario u ON a.id_usuarioB = u.id_usuario WHERE a.id_usuarioB = ? ";
    
    return new Promise ((res, rej) => {
        db.query(sql, [userID], (err, results) => {
            if(err) return rej(err);
            if (!!results && results.length > 0) {
                let resultJson = JSON.stringify(results[0]);
                resultJson = JSON.parse(resultJson);
                return rej (`Já é amigo de ${resultJson.nome}.`);
            } 
            return res('ok');
        });
    }).catch(err => {return err;});
};

exports.send_direct = params => {
    const sql = `INSERT INTO direct_message (id_amigos, chat_name, text, date_message) 
                 VALUES (?) `;

    return new Promise ((res, rej) => {
        db.query(sql, [params], (err) => {
            if(err) return rej(err);

            return res(`messagem enviada em ${params[3]}`);
        });
    });
};