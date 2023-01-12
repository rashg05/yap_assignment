const express = require('express');
const { userController } = require('../controllers');

// eslint-disable-next-line new-cap
const userRoutes = express.Router({});

userRoutes.post('/', userController.addOne);

module.exports = userRoutes;
