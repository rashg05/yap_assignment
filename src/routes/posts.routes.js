const express = require("express");
const { postsController } = require("../controllers");
const commentsRoutes = require("./comments.routes");


const postsRoutes = express.Router({mergeParams: true});

postsRoutes.post('/', postsController.addPosts);
postsRoutes.get('/', postsController.getAllPosts);
postsRoutes.get('/:post_id', postsController.getPostById);
postsRoutes.delete('/:post_id', postsController.deleteOnePost);
postsRoutes.put('/:post_id', postsController.updateOnePost);
postsRoutes.use('/:post_id/comments', commentsRoutes);

module.exports = postsRoutes;