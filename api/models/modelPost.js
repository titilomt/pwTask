'use strict';
const db = require('../util/dbconnection');
const NodeCache = require('node-cache');
const ttl = 60 * 60 * 72; // cache for 3 days
const cache = new NodeCache({ stdTTL: ttl, checkperiod: ttl * 0.2, useClones: false });

exports.post = params => {
    const sql = "INSERT INTO post (id_owner, nome, date_post, text, img, privacidade) VALUES (?) ";

    return new Promise ((res, rej) => {
        db.query(sql, [params], (err, results) => {
            if(err) return rej(err);
            
            let resultJson = JSON.stringify(results);
            resultJson = JSON.parse(resultJson);
            return res(resultJson);
        });
    });
};

exports.list_all_posts = userID => {
    const sql = `SELECT p.id, p.nome, p.text, p.img 
                 FROM post p WHERE p.id_owner = ${userID} 
                 OR (p.id_owner IN (SELECT u.id FROM usuario u 
                    INNER JOIN amigos f ON f.id_usuario_B = u.id 
                    where f.id_usuario_A = ${userID} 
                    AND ativo )) `;

    const key = `posts_user_${userID}`;

    return new Promise ((resolve, rej) => {
        const value = cache.get(key);
        if (value) {
            return resolve({data:value});
        } else {
            db.query(sql, [], (err, results) => {
                if(err) return rej(err);
                if(results.length > 0) {
                    let resultJson = JSON.stringify(results);
                    resultJson = JSON.parse(resultJson);   
                    let success = cache.set(key, resultJson);
                    if(success) return resolve({data:resultJson});
                    else return resolve({message: "Erro ao salvar no cache."});
                } else return resolve({message: "Não existem nenhum post"})
            });
        }       
    });
};

exports.delete_post = params => {
    const sql = `DELETE FROM post  
                 WHERE id_owner = ? AND id = ? `;

    return new Promise ((res, rej) => {
        db.query(sql, [params[0], params[1]], (err, results) => {
            if(err) return rej(err);

            
            if (results.affectedRows > 0) {
                let value = cache.del(`posts_user_${params[0]}`);
                // A delete will never fail
                return res({message: 'Post deletado com sucesso.'});                
            } else return rej({message: 'Usuario não é o proprietario, ou post não existe!'});
        });
    });
};

exports.update_post = params => {
    const sql = `UPDATE post SET text = ?, img = ?, privacidade = ? 
                 WHERE id_owner = ? AND id = ?  `;

    return new Promise ((res, rej) => {
        db.query(sql, [params[0], params[1], params[4], params[2], params[3]], (err, results) => {
            if(err) return rej(err);

            // console.log(params);

            if(results.affectedRows > 0 ) {
                let value = cache.del(`posts_user_${params[0]}`);
                // A delete will never fail
                // console.log(value);
                return res({message: 'Post alterado com sucesso!'});
            } else return rej({message: 'Não tem permissão de editar ou post não existe!'});
        });
    });
};