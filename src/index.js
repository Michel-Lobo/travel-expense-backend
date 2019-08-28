const express = require('express');
const bodyParse = require('body-parser');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(bodyParse.urlencoded({extended:false}));
app.use(routes);


app.listen(3333);