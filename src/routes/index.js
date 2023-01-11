const express = require('express');
const { error } = require('@yapsody/lib-handlers');
const middlewares = require('@yapsody/lib-middlewares');

// validate header parameters
const validateHeaders = middlewares.header.validator({
  'whitelabel-id': true,
  'account-id': true,
  'user-id': true,
});

// parse header parameters and assign to req object
const parseHeaders = middlewares.header.parser({
  'whitelabel-id': true,
  'account-id': true,
  'user-id': true,
});

const apiRoutes = express.Router();

const userRoutes = require('./user.routes');

apiRoutes.use('/users', [validateHeaders, parseHeaders, userRoutes]);

apiRoutes.use('*', () => error.throwNotFound({ item: 'Route' }));

module.exports = apiRoutes;
