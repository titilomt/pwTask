const express = require('express'),
app = express(),
port = process.env.PORT || 3000;

const bodyParser  = require("body-parser");
const configFile  = require("./config/local");
const mysql = require('mysql');

const routes = require('./api/routes');
routes(app);

app.listen(port, _ => console.log(`Alive @ ${port}`));

const con = mysql.createConnection({
    host: configFile.host,
    port: configFile.port,
    user: configFile.user,
    password: configFile.pass,
    database: configFile.db
});

con.connect( err => {
    if (err) throw err;
    console.log("Connected!");

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
});

app.use((req, res) => {
    res.status(404).send({url: req.originalUrl + ' not found'})
});  