'use strict';
const modelFriend = require('../models/modelFriend');


exports.search_friend = (req, res) => {
    
    const needle = req.body.nome;

    if (needle.length < 2) { res.send([]) }
    else {
        modelFriend.auto_complete(needle.toLowerCase()).then(ret => {
            res.send({ linesFound: ret.length, data: ret});
        }).catch(err => res.status(404).send(err));
    }
};

exports.list_all_friends = (req, res) => {
    
    const userID = req.body.id;

    modelFriend.get_all_friends(userID).then(ret => {
        res.status(200).send(ret);
    }).catch (err => res.status(404).send(err));
};

exports.delete_a_friend = (req, res) => {
    
    const userID = req.body.id;
    
    modelFriend.delete_friend(userID).then(ret => {
        res.status(200).send(ret);
    }).catch(err => res.status(404).send(err));
};