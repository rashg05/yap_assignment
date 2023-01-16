const express = require('express');
const { error } = require('@yapsody/lib-handlers');

// eslint-disable-next-line new-cap
const apiRoutes = express.Router();

const userRoutes = require('./user.routes');

apiRoutes.use('/users', [userRoutes]);

apiRoutes.use('*', () => error.throwNotFound({ item: 'Route' }));

module.exports = apiRoutes;
