const express = require("express");
const { postsController } = require("../controllers");


const postsRoutes = express.Router({mergeParams: true});

postsRoutes.post('/', postsController.addPosts);
postsRoutes.get('/', postsController.getAllPosts);
postsRoutes.get('/:post_id', postsController.getPostById);

module.exports = postsRoutes;