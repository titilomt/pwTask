'use strict';
const bcrypt    = require('bcrypt');
const random    = require('random-key-generator');

exports.encrypt = pass => {
    let hash = bcrypt.hashSync(pass, 8);
    return hash;
};

exports.gen = _=>{
    return random(50);
};

exports.verifyToken = (req, res, next) => {
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

// exports.reqTokenValidate = (reqToken, userID) => {
//     return new Promise ((res, rej) => { 
//         modelUtil.validate_token(userID).then(ret => {
//             let date = new Date();
//             if(date < ret.expiracao && ret.token === reqToken) {
//                 return res ({status: 200, message: ret});
//             }
//             else return rej(ret);
//         }).catch (err => {return err;});
//     });
// }