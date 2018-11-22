'use strict';
const modelFriend = require('../models/modelFriend');

exports.add_friend = (req, res) => {
    let date = new Date();

    const params = [
        req.body.id_usuario,
        req.body.id_amigo,
        true,
        date        
    ];

    modelGroup.add_friend(params).then(ret => {
        res.status(200).send({status: 200, data: ret});
    }).catch (err => {res.status(403).send(err)});
};

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
    
    const userID = req.body.user_id;

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

exports.send_direct = (req, res) => {
    let date = new Date();
    const params = [
        req.body.id_amigos,
        req.body.nome,
        req.body.text,
        date
    ];

    modelFriend.send_direct(params).then(ret => {
        res.status(200).send(ret);
    }).catch(err => res.status(404).send(err));
}