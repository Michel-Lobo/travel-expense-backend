const nodemailer = require('nodemailer');
const hb = require('handlebars')
const fs = require('fs');
const path = require('path')
const {host, port, user, password, from } = require('../config/mail');

module.exports = {
    async sendMail(to, subject, text){
     const sources = fs.readFileSync(path.join(__dirname, '../resources/mailer/template_reset_password.hbs'), 'utf-8');
     const template = hb.compile(sources);
     
        const transporter = nodemailer.createTransport({
            host: host,
            port: port,
            auth: {
                user: user,
                pass: password
            }
        });

          const mailOptions = {
            from: from,
            to: to,
            subject: subject,
            html: template({name:text})
          };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              return res.send({error})
            } else {
                return res.send({return: info.response});
            }
          });
    },
}