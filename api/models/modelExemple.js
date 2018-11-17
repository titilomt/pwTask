const db = require('../util/dbconnection');
const jwt = require('jsonwebtoken');

exports.get_all_users = _=> {
    let resultJson = '';
    let sql = "SELECT id, nome, email FROM usuario ";

    return new Promise ((res, rej) => {
        db.query(sql, [], (err, results) => {
            if(err) {
                return rej(err);
            }
            resultJson = JSON.stringify(results);
            resultJson = JSON.parse(resultJson);
            
            return res(resultJson);
        });
    });    
};

exports.get_one_user = params => {

    let sql = "SELECT id, nome, email FROM usuario WHERE TO_LOWER(nome) LIKE TO_LOWER(CONCAT( ??, '%' )) ";
    
    return new Promise ((res, rej) => {
        db.query(sql, [params], (err, results)=> {
            if(err) {
                return rej(err);
            }

            let resultJson = JSON.stringify(results);
            resultJson = JSON.parse(resultJson);
            
            return res(resultJson);
        });
    });
};

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['auth'];
    // Verificar se nossa barreira é undefined
    if (typeof bearerHeader !== 'undefined') {
        // Explode bearer
        const bearer = bearerHeader.split(' ');
        // Pegar nosso token do array
        const bearerToken = bearer[1];
        // Set token na requisição
        req.token = bearerToken;
        // Finalmente chamanos o next middleware
        next();
    } else {
        //You shall not pass
        res.sendStatus(403);
    }
};