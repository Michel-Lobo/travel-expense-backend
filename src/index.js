const express = require('express');
const bodyParse = require('body-parser');
const routes = require('./routes');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParse.urlencoded({extended:false}));
app.use(routes);


app.listen(process.env.PORT || 3333);