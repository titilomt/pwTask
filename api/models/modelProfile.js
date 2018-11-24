'use strict';
const db           = require('../util/dbconnection');
const cacheService = require('./cache.service');

const ttl = 60 * 60 * 72; // cache for 3 days
const cache = cacheService.constructor(ttl);

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

exports.delete_profile = (params) => {
    const sql = "DELETE profile WHERE id_owner = ? AND id = ? ";

    return new Promise ((res, rej) => {
        verifyOwner(params).then(ret => {
            if(ret === "ok") {
                db.query(sql, [params], err => {
                    if(err) return rej (err);
                    cache.del(`getUserProfile_${params[0]}`);
                    if(result.length > 0) return res("Perfil deletado.");

                    else return rej({message: 'Não foi possivel encontrar Perfil.'})
                });
            } else return rej(ret);
        });
    });
};

exports.modify_profile = params => {
    const sql = `UPDATE profile SET nome = ?, dt_nascimento = ?, escolaridade = ?,
                    relacionamento_status = ?, background_img = ?, profile_img = ?, privacidade = ?
                 WHERE id_owner = ? AND id = ? `;

    let verifyParams = [
        params[7],
        params[8]
    ];

    return new Promise ((res, rej) => {
        verifyOwner(verifyParams).then(ret => {
            if(ret === "ok") {
                db.query(sql, [params], (err, result) => {
                    if(err) return rej (err);
                    cache.del(`getUserProfile_${userID}`);
                    if(result.length > 0) return res("Perfil alterado com sucesso.");

                    else return rej({message: 'Não foi possivel encontrar Perfil.'});
                });
            } else return rej(ret);                
        });
    });
};

exports.get_profile_by_id = userID => {
    const sql = `SELECT nickname, 
                    dt_nascimento, escolaridade, relacionamento_status, 
                    background_img, privacidade FROM profile WHERE id_owner = ? `;

    return cache.get(`getUserProfile_${userID}`, _=> {
        db.query(sql, [userID], (err, results) => {
            if(err) return rej(err);
            
            if (results.length > 0 ){                
                let resultJson = JSON.stringify(results);
                resultJson = JSON.parse(resultJson);
                return resultJson;
            } else return {message: 'Perfil não encontrado.'};
        });
    });
};

function verifyOwner(params) {
    const sql = "SELECT id FROM profile WHERE id_owner = ?";
    return new Promise ((res, rej) => {
        db.query(sql, [params[0]], (err, results) => {
            if(err) return rej(err);

            let resultJson = JSON.stringify(results);
            resultJson = JSON.parse(resultJson);
            if(results.length > 0 && resultJson.id === params[1]) {
                return res ("ok");
            } 
            return rej("Não é o dono do perfil.");
        });
    }).catch(err => {return err;});
}