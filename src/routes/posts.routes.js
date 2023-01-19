const express = require("express");
const { postsController } = require("../controllers");


const postsRoutes = express.Router({});

postsRoutes.post('/', postsController.addPosts);
postsRoutes.get("/", postsController.getAllPosts);
postsRoutes.get('/:user_id', postsController.getPostById);

module.exports = postsRoutes;