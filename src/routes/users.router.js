const { getAll, create, getOne, remove, update, login, } = require('../controllers/users.controllers');
const express = require('express');
const { verifyJwt } = require('../utils/verifyJWT');

const routerUser = express.Router();

routerUser.route('/')
    .get(verifyJwt, getAll)
    .post(create)

routerUser.route('/login') 
    .post(login)

routerUser.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update)

module.exports = routerUser;