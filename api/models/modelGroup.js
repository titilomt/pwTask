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

exports.delete_group = (params) => {
    const sql = "DELETE grupo WHERE id_owner = ? AND id_grupo = ? ";

    return new Promise ((res, rej) => {
        verifyOwner(params).then(ret => {
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
    
    let verifyParams = [
        params[2],
        params[3]
    ];

    return new Promise ((res, rej) => {
        verifyOwner(verifyParams).then(ret => {
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

exports.join_group  = params => {
    const sql = "INSERT INTO lista_grupo (id_user, id_grupo, privilegio, data_entrada) VALUES (?)"

    return new Promise ((res, rej) => {
        db.query(sql, [params], (err, results) => {
            if(err) return rej(err);

            return res({message: 'Parabens você se tornou um novo membro.'});
        });
    });
};

exports.leave_group  = params => {
    const sql = `DELETE FROM lista_grupo 
                 WHERE id_grupo = ? 
                 AND id_user = ? `;

    return new Promise ((res, rej) => {
        verifyOwner(params).then(ret => {
            if(ret === 'ok') return delete_group(params);
            
            db.query(sql, [params], (err, results) => {
                if(err) return rej(err);
                
                if(results.lenth > 0) return rej({message: 'Não existem grupos ou usuario neste caminho'});
                
                return res({message: 'Você saiu do clan vamo cobra essa fita ae.'});
            });
        });
    });
};

exports.list_all_user_groups = params => {
    const sql = `SELECT g.nome, g.img FROM grupo g 
                 JOIN lista_grupo lg 
                 ON g.id = lg.id_grupo
                 WHERE lg.id_user = ? `;

    return new Promise ((res, rej) => {
        db.query(sql, [params], (err, results) => {
            if(err) return rej(err);
            
            if(results.lenth > 0) return res({message:'Você não possui nenhum grupo.'});

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

async function verifyOwner(params) {
    const sql = "SELECT id_owner FROM grupo WHERE id_grupo = ?";
    try {
        return new Promise((res, rej) => {
            db.query(sql, [params[1]], (err, results) => {
                if (err)
                    return rej(err);
                let resultJson = JSON.stringify(results[0]);
                resultJson = JSON.parse(resultJson);
                if (params[0] === resultJson.id_owner) {
                    return res("ok");
                }
                return rej("Não é o dono.");
            });
        });
    }
    catch (err) {
        return err;
    }
};