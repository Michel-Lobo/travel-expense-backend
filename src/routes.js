const express = require('express')

const routes = express.Router();
const userCtrl = require('.././src/app/controllers/UserController');
const orderCtrl = require('.././src/app/controllers/OrderController');
const travelCtrl = require('.././src/app/controllers/TravelController');
const middleware = require('./middlewares/auth')
const cors = require('cors');

routes.post('/register', cors(), userCtrl.register);
routes.post('/auth', cors(), userCtrl.auth);
routes.post('/forgotpassword', userCtrl.forgotPassword)
routes.post('/resetpassword', userCtrl.resetPassword)
routes.use(middleware);
routes.get('/order', orderCtrl.index);
routes.post('/travel', travelCtrl.create);
routes.get('/travel/getall', travelCtrl.getAll);
module.exports = routes;