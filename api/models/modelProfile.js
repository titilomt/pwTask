'use strict';
const db           = require('../util/dbconnection');
const NodeCache = require('node-cache');
const ttl = 60 * 60 * 72; // cache for 3 days
const cache = new NodeCache({ stdTTL: ttl, checkperiod: ttl * 0.2, useClones: false });

exports.create_profile = params => {
    const sql = `INSERT INTO profile (id_owner, nickname, 
                    dt_nascimento, escolaridade, relacionamento_status, 
                    background_img, profile_img, privacidade) VALUES (?) `;

    return new Promise ((res, rej) => {
        db.query(sql, [params], err => {
            if(err) {
                return rej (err);
            }
            return res ("Perfil criado com sucesso.");
        });
    });

};

exports.delete_profile = (params) => {
    const sql = "DELETE FROM profile WHERE id_owner = ? AND id = ? ";

    return new Promise ((res, rej) => {
        // verifyOwner(params).then(ret => {
            // if(ret === "ok") {
                db.query(sql, [params[0], params[1]], (err, result) => {
                    if(err) return rej (err);
                    let value = cache.del(`profile_user_${params[0]}`);
                    if (value) console.log("cache deletado");
                    if(result.affectedRows > 0) return res("Perfil deletado.");

                    else return rej({message: 'Não foi possivel encontrar Perfil.'})
                });
            // } else return rej(ret);
        // });
    });
};

exports.modify_profile = params => {
    const sql = `UPDATE profile SET nickname = ?, dt_nascimento = ?, escolaridade = ?,
                    relacionamento_status = ?, background_img = ?, profile_img = ?, privacidade = ?
                 WHERE id_owner = ? AND id = ? `;

    return new Promise ((res, rej) => {
        // verifyOwner(verifyParams).then(ret => {
        //     if(ret === "ok") {
                db.query(sql, [params[0],params[1],params[2],params[3],params[4],params[5],params[6],params[7],params[8]], (err, result) => {
                    if(err) return rej (err);
                    console.log(params);
                    let value = cache.del(`profile_user_${params[7]}`);
                    if (value) console.log("cache deletado");
                    if(result.affectedRows > 0) return res("Perfil alterado com sucesso.");

                    else return rej({message: 'Não foi possivel encontrar Perfil.'});
                });
            // } else return rej(ret);                
        // });
    });
};

exports.get_profile_by_id = userID => {
    const sql = `SELECT nickname, 
                    dt_nascimento, escolaridade, relacionamento_status, 
                    background_img, privacidade FROM profile WHERE id_owner = ? `;

    const key = `profile_user_${userID}`;

    return new Promise ((resolve, rej) => {
        const value = cache.get(key);
        if (value) {
            return resolve({data:value});
        } else {
            db.query(sql, [userID], (err, results) => {
                if(err) return rej(err);
                
                if (results.length > 0 ){         
                    let resultJson = JSON.stringify(results);
                    resultJson = JSON.parse(resultJson);
                    let success = cache.set(key, resultJson);
                    if(success) return resolve({data:resultJson});
                    else return resolve({message: "Erro ao salvar no cache."});
                } else return {message: 'Perfil não encontrado.'};
            });
        }
    });
};

// function verifyOwner(params) {
//     const sql = "SELECT id FROM profile WHERE id_owner = ?";
//     return new Promise ((res, rej) => {
//         db.query(sql, [params[0]], (err, results) => {
//             if(err) return rej(err);

//             let resultJson = JSON.stringify(results);
//             resultJson = JSON.parse(resultJson);
//             if(results.length > 0 && resultJson.id === params[1]) {
//                 return res ("ok");
//             } 
//             return rej("Não é o dono do perfil.");
//         });
//     }).catch(err => {return err;});
// };