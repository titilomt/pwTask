'use strict'
const db   = require('../util/dbconnection');

exports.insert_group = templateGrupo => {
    const sql = "INSERT INTO grupo (id_owner, nome, chave, date_grupo, img, privacidade) VALUES (?)";
    let params = valuesToArray(templateGrupo);

    return new Promise((res, rej) => {
        db.query(sql, [params], err => {
            if(err) {
                return rej (err);
            }

            return res({message: "grupo criado com sucesso!"});
        });
    });
};

exports.get_group_id = (params, key) => {
    const sql = "SELECT id FROM grupo WHERE id_owner = ? AND chave = ? ";

    return new Promise((res, rej) => {
        db.query(sql, [params, key], (err, result) => {
            if(err) {
                return rej (err);
            }
            
            let resultJson = JSON.stringify(result);
            resultJson = JSON.parse(resultJson);
            return res (resultJson);
        });
    });
};

exports.delete_group = (params) => {
    const sql = "DELETE FROM grupo WHERE id = ? AND id_owner = ? ";

    return new Promise ((res, rej) => {
        // verifyOwner(params).then(ret => {
            // if(ret.message === "ok") {
                db.query(sql, [params[0], params[1]], (err, result) => {
                    if(err) return rej (err);
                    if(result.affectedRows > 0) return res({message: "Grupo deletado."});

                    else return rej({message: "Não tem permissão de delete."})
                });
            // } else return rej(ret);                
        // });
    });
};

exports.update_group = params => {
    const sql = "UPDATE grupo SET nome = ?, img = ? WHERE id_owner = ? AND id = ? ";
    
    return new Promise ((res, rej) => {
        // verifyOwner(verifyParams).then(ret => {
            // if(ret.message === "ok") {
        db.query(sql, [params[0], params[1], params[2], params[3]], (err, result) => {
            if(err) return rej (err);

            if(result.affectedRows > 0) return res({message:"Grupo alterado com sucesso."});
            else return rej({message: "Não possui permissão de modificar."})
        });
            // } else return rej(ret);                
        // });
    });
};

exports.get_group_by_name = grupoName => {
    const sql = "SELECT id, nome, img FROM grupo WHERE LOWER(nome) LIKE CONCAT( ?, '%')  ";

    return new Promise ((res, rej) => {
        db.query(sql, [grupoName], (err, results) => {
            if(err) return rej(err);
            
            let resultJson = JSON.stringify(results);
            resultJson = JSON.parse(resultJson);
            return res(resultJson);
        });
    });
};

exports.join_group  = params => {
    const sql = "INSERT INTO lista_grupo (id_usuario, id_grupo, permissao) VALUES (?)"

    return new Promise ((res, rej) => {
        db.query(sql, [params], (err, results) => {
            if(err) return rej(err);
            if(results.lenth === 0) res({message: "Não foi possivel entrar no grupo."})
            return res({message: 'Parabens você se tornou um novo membro.'});
        });
    });
};

exports.leave_group  = params => {
    const sql = `DELETE FROM lista_grupo 
                 WHERE id_usuario = ? 
                 AND id_grupo = ? `;

    return new Promise ((res, rej) => {
        verifyOwner(params).then(ret => {
            
            
            db.query(sql, [params[0],params[1]], (err, results) => {
                if(err) return rej(err);
                
                if(results.lenth > 0) return rej({message: 'Não existem grupos ou usuario neste caminho'});

                if(ret.message === 'ok') {
                    return delete_group(params);
                } else {
                    return res({message: 'Você saiu do clan vamo cobra essa fita ae.'});
                }                
            });
        });
    });
};

exports.list_all_user_groups = params => {
    const sql = `SELECT g.nome, g.img FROM grupo g 
                 JOIN lista_grupo lg 
                 ON g.id = lg.id_grupo
                 WHERE lg.id_usuario = ? `;

    return new Promise ((res, rej) => {
        db.query(sql, [params], (err, results) => {
            if(err) return rej(err);
            
            if(results.lenth === 0) return res({message:'Você não possui nenhum grupo.'});

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

exports.insert_list_grupo = params => {
    const sql = "INSERT INTO lista_grupo (id_usuario, id_grupo, permissao) VALUES (?) ";

    return new Promise ((res, rej) => {
        db.query(sql, [params], (err, results) => {
            if(err) return rej(err);
            
            if(results.lenth === 0) return rej({message:'Erro ao adicionar a lista.'});

            return res({message: "Lista grupo atualizada!"});
        });
    });    
};

async function verifyOwner(params) {
    const sql = "SELECT permissao FROM lista_grupo WHERE id_usuario = ? AND id_grupo = ? ";
  
    return new Promise((res, rej) => {
        db.query(sql, [params[0], params[1]], (err, results) => {
            if (err) return rej(err);

            
            if (results.lenth === 0) return rej({message: "Grupo não encontrado."});
            let resultJson = JSON.stringify(results[0]);
            resultJson = JSON.parse(resultJson);
            if (resultJson.permissao === 4) { // Permissao de dono do grupo
                return res({message:"ok"});
            }
            
            return rej({message:"Não é o dono."});
        });
    }).catch(err => {return err});
};