'use strict';
const db = require('../util/dbconnection');

exports.post_gruop = params => {
    const sql = "INSERT INTO post_grupo (id_owner, id_grupo, nome, data_criacao, text, img) VALUES (?) ";

    let verifyParams = [
        params[0],
        params[1]
    ];
    
    return new Promise ((res, rej) => {
        verify_membership(verifyParams).then(ret => {
            if(ret.message != 'ok') rej({message: "Permissão negada."});

            db.query(sql, [params], (err, results) => {
                if(err) return rej(err);
                
                let resultJson = JSON.stringify(results);
                resultJson = JSON.parse(resultJson);
                return res(resultJson);
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
    const sql = `DELETE post_grupo  
                 WHERE id_owner = ? AND id_post = ? `;

    return new Promise ((res, rej) => {
        verify_membership(params).then(ret => {

            if (ret.messagem != 'ok') return rej({message: "Permissão negada."});
            
            db.query(sql, [params], (err, results) => {
                if(err) return rej(err);
                if (results.length > 0) return res({message: 'Post deletado com sucesso.'});
    
                else return rej({message: 'Usuario não é o proprietario, ou post não existe!'});
            });        
        });
    });
};

exports.update_post = params => {
    const sql = `UPDATE post_grupo SET text = ?, img = ?  
                 WHERE id_owner = ? AND id_post = ?  `;

    let verifyParams = [
        params[2],
        params[3]
    ];

    return new Promise ((res, rej) => {
        verify_membership(verifyParams).then(ret => {
            if (ret.messagem != 'ok') return rej({message: "Permissão negada."});
            
            db.query(sql, [params], (err, results) => {
                if(err) return rej(err);
    
                if(results.length > 0 ) return res({message: 'Post alterado com sucesso!'});
    
                else return rej({message: 'Não tem permissão de editar ou post não existe!'});
            });
        });
    });
};


async function verify_membership (params) {
    const sql = "SELECT permissao FROM lista_grupo WHERE id_usuario = ? AND id_grupo = ? ";

    return new Promise((res, rej) => {
        db.query(sql, [params], (err, results) => {
            if (results.lenth === 0) return rej({message: "Grupo não encontrado."})
            
            if (err) return rej(err);
            let resultJson = JSON.stringify(results[0]);
            resultJson = JSON.parse(resultJson);
            if (resultJson.permissao === 4 || 
                resultJson.permissao === 3 ||
                resultJson.permissao === 2 ) 
                { // Permissao de escrita, edicao e remoção dos post
                return res({message:"ok"});
            }
            
            return res({message:"leitura"});
        });
    });
};