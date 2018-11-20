const db = require('../util/dbconnection');

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
    const sql = `SELECT p.id_post, p.nome, p.text, p.img FROM post p, amigos a, usuario u 
                 WHERE u.id_usuario IN (a.id_usuarioA, a.id_usuarioB)
                 AND p.id_owner = a.id_usuarioB 
                 AND `;

    return new Promise ((res, rej) => {
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

            return res({message: 'Post deletado com sucesso.'});
        });
    });
};

exports.update_post = params => {
    const sql = `UPDATE post SET text = ?, img = ?  
                 WHERE id_usuario = ? AND id_post = ?  `;

    return new Promise ((res, rej) => {
        db.query(sql, [params], (err, results) => {
            if(err) return rej(err);
            
            let resultJson = JSON.stringify(results);
            resultJson = JSON.parse(resultJson);
            return res(resultJson);
        });
    });
};