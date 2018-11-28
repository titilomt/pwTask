'use strict';
const db = require('../util/dbconnection');

exports.post_group = params => {
    const sql = "INSERT INTO post_grupo (id_owner, id_grupo, nome, date_post, text, img) VALUES (?) ";

    let verifyParams = [
        params[0],
        params[1]
    ];
    
    return new Promise ((res, rej) => {
        verify_membership(verifyParams).then(ret => {
            if(ret.messagem != 'ok') rej({messagem: "Permissão negada."});

            db.query(sql, [params], (err, results) => {
                if(err) return rej(err);
                
                if(results.affectedRows === 0) rej({messagem: "Ocorreu um erro inesperado..."});

                return res({messagem: "Seu post está no clã. Com grandes poderes, vem grandes responsabilidades!"});
            });
        });
    });
};

exports.list_all_posts = grupoID => {
    const sql = `SELECT pg.id, pg.nome, pg.text, pg.img, u.nome AS op 
                 FROM post_grupo pg 
                 JOIN usuario u 
                 ON u.id = pg.id_owner 
                 WHERE   id_grupo = ? `;

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
    const sql = `DELETE FROM post_grupo  
                 WHERE id_owner = ? 
                 AND id_grupo = ? 
                 AND id = ? `;

    const verifyParams = [
        params[0],
        params[1]
    ];

    return new Promise ((res, rej) => {
        verify_membership(verifyParams).then(ret => {

            if (ret.messagem != 'ok') return rej({messagem: "Permissão negada."});
            
            db.query(sql, [params[0], params[1], params[2]], (err, results) => {
                if(err) return rej(err);
                if (results.affectedRows > 0) return res({messagem: 'Post deletado com sucesso.'});
    
                else return rej({messagem: 'Usuario não é o proprietario, ou post não existe!'});
            });        
        });
    });
};

exports.update_post = params => {
    const sql = `UPDATE post_grupo SET text = ?, img = ?  
                 WHERE id_owner = ? AND id_grupo = ?  `;

    const verifyParams = [
        params[2],
        params[3]
    ];

    return new Promise ((res, rej) => {
        verify_membership(verifyParams).then(ret => {

            if (ret.messagem != 'ok') return rej({messagem: "Permissão negada."});
            
            db.query(sql, [params[0], params[1], params[2], params[3]], (err, results) => {
                if(err) return rej(err);
                
                if(results.affectedRows > 0 ) return res({messagem: 'Post alterado com sucesso!'});
    
                else return rej({messagem: 'Não tem permissão de editar ou post não existe!'});
            });
        });
    });
};


async function verify_membership (params) {
    const sql = "SELECT permissao FROM lista_grupo WHERE id_usuario = ? AND id_grupo = ? ";

    return new Promise((res, rej) => {
        db.query(sql, [params[0], params[1]], (err, results) => {
            if (results.lenth === 0) return rej({messagem: "Grupo não encontrado."})
            
            if (err) return rej(err);
            let resultJson = JSON.stringify(results[0]);
            resultJson = JSON.parse(resultJson);
            if (resultJson.permissao === 5 || 
                resultJson.permissao === 4 || 
                resultJson.permissao === 3 ||
                resultJson.permissao === 2 ) 
                { // Permissao de escrita, edicao e remoção dos post
                return res({messagem:"ok"});
            }
            
            return res({messagem:"leitura"});
        });
    });
};