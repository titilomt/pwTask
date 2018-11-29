'use strict';
const db = require('../util/dbconnection');

exports.add_friend = params => {
    const sql = "INSERT INTO amigos (id_usuario_A, id_usuario_B, ativo, data_criacao) VALUES (?) ";
    
    return new Promise ((res, rej) => {
        verify_user_friend(params[1]).then(message => {
            if (message === "ok") {
                db.query(sql, [params], err => {
                    if(err) return rej (err);
                    return res ({message:"Agora vuces sao miguxos."});
                });
            } else return rej ({message: message});        
        }).catch (err => {return err;});
    });
}

exports.auto_complete = userName => {
    const sql = "SELECT id, nome, email FROM usuario WHERE LOWER(nome) LIKE CONCAT( ?, '%')  ";

    return new Promise ((res, rej) => {
        db.query(sql, [userName], (err, results) => {
            if(err) return rej(err);
            
            let resultJson = JSON.stringify(results);
            resultJson = JSON.parse(resultJson);
            return res(resultJson);
        });
    });
};

exports.get_all_friends = userID => {
    const sql = `SELECT u.id, u.nome, u.email FROM usuario u 
                    INNER JOIN amigos f ON f.id_usuario_B = u.id 
                    where f.id_usuario_A = ? 
                 AND ativo `;

    return new Promise ((res, rej) => {
        db.query(sql, [userID, userID], (err, results) => {
            if(err) return rej(err);
            
            let resultJson = JSON.stringify(results);
            resultJson = JSON.parse(resultJson);
            if (resultJson.length > 0){
                return res(resultJson);
            }return res({message: 'Você não tem amigos listados ainda. Faça amigos!'})
        });
    });
};

exports.delete_friend = (userID, friendID) => {
    const sql = `DELETE FROM amigos 
                 WHERE ((id_usuario_A = ${userID} AND id_usuario_B = ${friendID}) 
                 OR (id_usuario_A = ${friendID} AND id_usuario_B = ${userID})) `;

    return new Promise ((res, rej) => {
        db.query(sql, [], (err, results) => {
            if(err) return rej(err);
            if(results.changedRows === 0) return res({message: "Não possui ligações com esse elemento."});

            return res({message: "Deixou de ser amigo."});
        });
    });
};

function verify_user_friend (userID) {
    const sql = `SELECT u.nome, a.ativo 
                 FROM amigos a 
                 INNER JOIN usuario u 
                 ON a.id_usuario_A = u.id 
                 WHERE a.id_usuario_B = ? AND a.ativo`;
    
    return new Promise ((res, rej) => {
        db.query(sql, [userID], (err, results) => {
            if(err) return rej(err);            

            if (results.length > 0) {                
                let resultJson = JSON.stringify(results[0]);
                resultJson = JSON.parse(resultJson);
                return rej (`Já é amigo de ${resultJson.nome}.`);
            } else return res("ok");
        });
    }).catch(err => {return err;});
};

exports.send_direct = params => {
    const sql = `INSERT INTO direct_message (id_usuario_A, id_usuario_B, chat_name, text, date_message) 
                 VALUES (?) `;

    return new Promise ((res, rej) => {
        db.query(sql, [params], (err) => {
            if(err) return rej(err);

            return res({message: `messagem enviada em ${params[4]}`});
        });
    });
};

exports.retrive_direct = params => {
    const sql = `SELECT text, chat_name, date_message FROM direct_message 
                 WHERE  ((id_usuario_A = ${params[0]} AND id_usuario_B = ${params[1]}) 
                 OR (id_usuario_A = ${params[1]} AND id_usuario_B = ${params[0]})) 
                 AND ( date_message BETWEEN ${params[2]} AND SYSDATE() ) `;

    return new Promise ((res, rej) => {
        db.query(sql, [], (err, results) => {
            if(err) return rej(err);
            if(results.length>0) {    
                let resultJson = JSON.stringify(results[0]);
                resultJson = JSON.parse(resultJson);
                return res({data: resultJson});
            } 
            return res({message :"Nenhuma messagem encontrada"});
        });
    });
};