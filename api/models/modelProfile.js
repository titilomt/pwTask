'use strict';
const db   = require('../util/dbconnection');

exports.create_profile = params => {
    const sql = `INSERT INTO profile (id_owner, nickname, 
                    dt_nascimento, escolaridade, relacionamento_status, 
                    background_img, privacidade) VALUES (?) `;

    return new Promise ((res, rej) => {
        db.query(sql, [params], err => {
            if(err) {
                return rej (err);
            }
            return res ("Perfil criado com sucesso.");
        });
    });

};

exports.delete_profile = (userID) => {
    const sql = "DELETE profile WHERE id_owner = ? ";

    return new Promise ((res, rej) => {
        verifyOwner(userID).then(ret => {
            if(ret === "ok") {
                db.query(sql, [userID, grupoID], err => {
                    if(err) return rej (err);

                    return res("Perfil deletado.");
                });
            } else return rej(ret);
        });
    });
};

exports.modify_profile = params => {
    const sql = `UPDATE profile SET nome = ?, dt_nascimento = ?, escolaridade = ?,
                    relacionamento_status = ?, background_img = ?, profile_img = ?, privacidade = ?
                 WHERE id_owner = ? `;

    return new Promise ((res, rej) => {
        verifyOwner(params[7]).then(ret => {
            if(ret === "ok") {
                db.query(sql, [params], err => {
                    if(err) return rej (err);

                    return res("Grupo alterado com sucesso.");
                });
            } else return rej(ret);                
        });
    });
};

exports.get_profile_by_id = userID => {
    const sql = `SELECT nickname, 
                    dt_nascimento, escolaridade, relacionamento_status, 
                    background_img, privacidade FROM profile WHERE id_owner = ? `;

    return new Promise ((res, rej) => {
        db.query(sql, [userID], (err, results) => {
            if(err) return rej(err);
            
            let resultJson = JSON.stringify(results);
            resultJson = JSON.parse(resultJson);
            return res(resultJson);
        });
    });
};

function verifyOwner(userID) {
    const sql = "SELECT id_owner FROM profile WHERE id_owner = ?";
    return new Promise ((res, rej) => {
        db.query(sql, [userID], (err, results) => {
            if(err) return rej(err);
            
            if(results.length > 0) {
                return res ("ok");
            } 
            return rej("Não é o dono do perfil.");
        });
    }).catch(err => {return err;});
}