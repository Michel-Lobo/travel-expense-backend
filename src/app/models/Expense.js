const {Schema, Model} = require('mongoose');
const mongoose = require('../database');
const ExpenseSchema= new Schema({
    description:{
        type:String,
        required:true
    },
    value:{
        type: Number,
        required:true
    },
    travel:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Travel',
        required:true
    }
},
{
    timestamps:true
});
const Expense = mongoose('Travel', ExpenseSchema);