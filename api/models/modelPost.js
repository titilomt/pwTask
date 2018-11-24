'use strict';
const cacheService = require('./cache.service');

const db = require('../util/dbconnection');

const ttl = 60 * 60 * 72; // cache for 3 days
const cache = cacheService.constructor(ttl);

exports.post = params => {
    const sql = "INSERT INTO post (id_owner, nome, data_criacao, text, img, visualizacao) VALUES (?) ";

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
    const sql = `SELECT p.id_post, p.nome, p.text, p.img 
                 FROM post p 
                 INNER JOIN amigos ON amigos.id_usuarioA = ? `;

    return cache.get(`getFriendsPost_${userID}`, _=> {
        db.query(sql, [userID], (err, results) => {
            if(err) return rej(err);
            
            let resultJson = JSON.stringify(results);
            resultJson = JSON.parse(resultJson);
            return res(resultJson);
        });
    });
};

exports.delete_post = params => {
    const sql = `DELETE post  
                 WHERE id_usuario = ? AND id_post = ? `;

    return new Promise ((res, rej) => {
        db.query(sql, [params], (err, results) => {
            if(err) return rej(err);

            cache.del(`getFriendsPost_${userID}`);
            if (results.length > 0) return res({message: 'Post deletado com sucesso.'});

            else return rej({message: 'Usuario não é o proprietario, ou post não existe!'});
        });
    });
};

exports.update_post = params => {
    const sql = `UPDATE post SET text = ?, img = ?  
                 WHERE id_usuario = ? AND id_post = ?  `;

    return new Promise ((res, rej) => {
        db.query(sql, [params], (err, results) => {
            if(err) return rej(err);
            
            if(results.length > 0 ) return res({message: 'Post alterado com sucesso!'});

            else return rej({message: 'Não tem permissão de editar ou post não existe!'});
        });
    });
};