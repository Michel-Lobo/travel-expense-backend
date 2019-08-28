const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://deveuser:devuser@cluster0-4t5q9.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser:true});
mongoose.Promise = global.Promise;
 module.exports = mongoose;