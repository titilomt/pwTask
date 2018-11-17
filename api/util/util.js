const bcrypt = require('bcrypt');

exports.encrypt = pass => {
    let hash = bcrypt.hashSync(pass, 8);
    return hash;
};