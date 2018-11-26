'use strict';
const modelExemple = require('../models/modelExemple');

exports.list_all_users = (req, res) => {
    res.send(`Olá caro senhor ${req.query.nome}`);
};

exports.exemple_retrive_user = (req, res) => {    
    res.send(`Olá caro senhor ${req.params.nome}`);
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