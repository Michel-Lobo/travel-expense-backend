const userModel = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../.././config/auth')
const util = require('../.././utils/sendmail');

const crypto = require('crypto');
module.exports = {
    async register(req, res) {
        const { name, email, password } = req.body;
        if (await userModel.findOne({ email }))
            return res.status(400).send({ error: "User already exists" });

        try {
            const user = await userModel.create(req.body);
            user.password = undefined;
            const token = jwt.sign({ id: user._id }, authConfig.secret, {
                expiresIn: 86400
            })
            return res.send({ user, token });
        }
        catch (err) {
            return res.status(400).json({ 'error': 'Registration failed' });
        }
    },

    async auth(req, res) {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email }).select('+password');

        if (!user) return res.status(400).send({ error: 'User not found' });

        if (!user.confirmed) return res.status(401).send({ error: 'Email not confirmed' })

        if (!await bcrypt.compare(password, user.password)) return res.status(400).send({ error: 'Invalid password' });


        user.password = undefined;
        const token = jwt.sign({ id: user._id }, authConfig.secret, {
            expiresIn: 86400
        })
        res.send({ user, token });
    },

    async forgotPassword(req, res) {

        const { email } = req.body;
        try {
            const user = await userModel.findOne({ email })
            if (!user) return res.send({ error: 'User not exists' });
            const token = crypto.randomBytes(3).toString('hex');

            const now = new Date();
            now.setHours(now.getHours() + 1);
            await userModel.findByIdAndUpdate(user._id, {
                $set: {
                    passwordResetToken: token,
                    expireRessetToken: now
                }
            });
            util.sendMail(user.email, "Forgot Password", "Code Reset - " + token);
            return res.send({ ok: true, email: email });
        }
        catch (err) {
            return res.send({ error: 'Failed forgot password' });
        }

    },

    async resetPassword(req, res) {
        const { code, newPassword } = req.body;

        try {
            const user = await userModel.findOneAndUpdate({ passwordResetToken: code },
                {
                    $set: {
                        password: newPassword,
                        passwordResetToken: '',
                        confirmed: new Date().getDate()
                    }
                },
                { new: true });

            if (!user) return res.status(400).send({ error: 'User or code invalid' });
            //await userModel.findByIdAndUpdate(user._id,{confirmed:new Date().getDate()});
            const token = jwt.sign({ id: user._id }, authConfig.secret, {
                expiresIn: 86400
            });
            return res.send({ user, token });
        }
        catch (err) {
            return res.send({ error: 'Confirm faild' });
        }


    }
}