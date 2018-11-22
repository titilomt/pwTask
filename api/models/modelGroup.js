'use strict'
const db   = require('../util/dbconnection');

exports.insert_group = templateGrupo => {
    const sql = "INSERT INTO grupo (id_owner, nome, criacao, img) VALUES (?)";

    let params = valuesToArray(templateGrupo);

    return new Promise ((res, rej) => {
        db.query(sql, [params], err => {
            if(err) {
                return rej (err);
            }
            return res ("Grupo criado com sucesso.");
        });
    });
};

exports.delete_group = (userID, grupoID) => {
    const sql = "DELETE grupo WHERE id_owner = ? AND id_grupo = ? ";

    return new Promise ((res, rej) => {
        verifyOwner(userID, grupoID).then(ret => {
            if(ret === "ok") {
                db.query(sql, [userID, grupoID], err => {
                    if(err) return rej (err);

                    return res("Grupo deletado.");
                });
            } else return rej(ret);                
        });
    });
};

exports.update_group = params => {
    const sql = "UPDATE grupo SET nome = ?, img = ? WHERE id_owner = ? AND id_grupo = ? ";

    return new Promise ((res, rej) => {
        verifyOwner(params[2], params[3]).then(ret => {
            if(ret === "ok") {
                db.query(sql, [params], err => {
                    if(err) return rej (err);

                    return res("Grupo alterado com sucesso.");
                });
            } else return rej(ret);                
        });
    });
};

exports.get_group_by_name = params => {
    const sql = "SELECT id_grupo, nome, img FROM grupo WHERE nome LIKE CONCAT( ?, '%')  ";

    return new Promise ((res, rej) => {
        db.query(sql, [params], (err, results) => {
            if(err) return rej(err);
            
            let resultJson = JSON.stringify(results);
            resultJson = JSON.parse(resultJson);
            return res(resultJson);
        });
    });
};

function valuesToArray(obj) {
    return Object.keys(obj).map( key => {
        return obj[key]; 
    });
};

function verifyOwner(userID, grupoID) {
    const sql = "SELECT id_owner FROM grupo WHERE id_grupo = ?";
    return new Promise ((res, rej) => {
        db.query(sql, [grupoID], (err, results) => {
            if(err) return rej(err);
            
            let resultJson = JSON.stringify(results[0]);
            resultJson = JSON.parse(resultJson);
            
            if(userID === resultJson.id_owner) {
                return res ("ok");
            } 
            return rej("Não é o dono.");
        });
    }).catch(err => {return err;});
}