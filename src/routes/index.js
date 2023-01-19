const express = require('express');
const { error } = require('@yapsody/lib-handlers');


const apiRoutes = express.Router();

const userRoutes = require('./user.routes');
const postsRoutes = require('./posts.routes');

apiRoutes.use('/users', [userRoutes]);
apiRoutes.use('/posts', [postsRoutes]);

apiRoutes.use('*', () => error.throwNotFound({ item: 'Route' }));

module.exports = apiRoutes;
