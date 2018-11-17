const express = require('express');
const bodyParser  = require("body-parser");

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./api/routes')(app);
app.listen(port, _ => console.log(`Alive @ ${port}`));  

app.use((req, res) => {
    res.status(404).send({url: req.originalUrl + ' not found'})
});  