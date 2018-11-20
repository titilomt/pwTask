const bcrypt = require('bcrypt');

exports.encrypt = pass => {
    let hash = bcrypt.hashSync(pass, 8);
    return hash;
};

exports.gen = _=>{
    return 'secretkey';
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