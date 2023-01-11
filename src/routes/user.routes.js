const express = require('express');
const { userController } = require('../controllers');

const userRoutes = express.Router({});

userRoutes.post('/', userController.addOne);

module.exports = userRoutes;
