'use strict';
const modelExemple = require('../models/modelExemple');

exports.list_all_users = (req, res) => {    
    modelExemple.get_all_users().then(ret => {        
        res.status(200).send(ret);
    }).catch (err => res.status(404).send(err));
};

exports.exemple_retrive_user = (req, res) => {
    const params = res.body.nome;
    modelExemple.get_one_user(params).then(ret => {
        res.status(200).send(ret);
    }).catch (err => res.status(404).send(err));
};

exports.read_a_task = function(req, res) {
    Task.findById(req.params.taskId, function(err, task) {
        if (err)
        res.send(err);
        res.json(task);
    });
};

exports.update_a_task = function(req, res) {
    Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
        if (err)
        res.send(err);
        res.json(task);
    });
};

exports.delete_a_task = function(req, res) {
    Task.remove({
        _id: req.params.taskId
    }, function(err, task) {
        if (err)
        res.send(err);
        res.json({ message: 'Task successfully deleted' });
    });
};