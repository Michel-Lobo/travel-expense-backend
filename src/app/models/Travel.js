const {Schema, model} = require('mongoose');
const mongoose = require('../../database');
const TravelSchema = new Schema({
    description:{
        type:String,
        required:true
    },
    budget:{
        type: Number,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    expenses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Expense',
        require:false
    }]
},
{
    timestamps:true
});
module.exports = model('Travel', TravelSchema);