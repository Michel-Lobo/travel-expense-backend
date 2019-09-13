const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');
const util = require('../../utils/sendmail')
const crypto = require('crypto');
const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        lowercase:true,
        required:true
    },
    password:{
        type: String,
        required:true,
        select:false
    },
    confirmed:{
        type:Date,
        required: false
    },
    codeConfirmed:{
        type:String,
        required:false
    },
    passwordResetToken:{
        type: String,
        select: false
    },
    expireRessetToken:{
        type: Date,
        select: false
    }

},{
    timestamps:true
});
UserSchema.pre('save', async function(next){
    //criptografa a senha escolhida
    const hashPassword = await bcrypt.hash(this.password, 10);
    //const now = new Date();
    const code = crypto.randomBytes(5).toString('hex');
    //gera codigo de confirmação
    this.password = hashPassword;
    //const {code} = utilites.getCode();
    this.codeConfirmed = code; 

});

UserSchema.post('save', function(next){
    util.sendMail(this.email, 'criação de conta', 'teste '+this.codeConfirmed);
});

module.exports = model('User', UserSchema)