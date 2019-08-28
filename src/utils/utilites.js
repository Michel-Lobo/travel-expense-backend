const crypto = require('crypto');

module.exports ={
    getCode(req, res){
        const code = crypto.randomBytes(20).toString('hex');
        
        return res.send({code:code});

    },
}