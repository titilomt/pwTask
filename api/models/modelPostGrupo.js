'use strict';
const db = require('../util/dbconnection');

exports.post = params => {
    const sql = "INSERT INTO post_grupo (id_owner, nome, data_criacao, text, img) VALUES (?) ";

    return new Promise ((res, rej) => {
        db.query(sql, [params], (err, results) => {
            if(err) return rej(err);
            
            let resultJson = JSON.stringify(results);
            resultJson = JSON.parse(resultJson);
            return res(resultJson);
        });
    });
};

exports.list_all_posts = grupoID => {
    const sql = `SELECT id_post, nome, text, img FROM post_grupo 
                 WHERE   id_post = ? `;

    return new Promise ((res, rej) => {
        db.query(sql, [grupoID], (err, results) => {
            if(err) return rej(err);
            
            let resultJson = JSON.stringify(results);
            resultJson = JSON.parse(resultJson);
            return res(resultJson);
        });
    });
};

exports.delete_post = params => {
    const sql = `DELETE post_grupo  
                 WHERE id_owner = ? AND id_post = ? `;

    return new Promise ((res, rej) => {
        db.query(sql, [params], (err, results) => {
            if(err) return rej(err);
            if (results.length > 0) return res({message: 'Post deletado com sucesso.'});

            else return rej({message: 'Usuario não é o proprietario, ou post não existe!'});
        });
    });
};

exports.update_post = params => {
    const sql = `UPDATE post_grupo SET text = ?, img = ?  
                 WHERE id_owner = ? AND id_post = ?  `;

    return new Promise ((res, rej) => {
        db.query(sql, [params], (err, results) => {
            if(err) return rej(err);

            if(results.length > 0 ) return res({message: 'Post alterado com sucesso!'});

            else return rej({message: 'Não tem permissão de editar ou post não existe!'});
        });
    });
};