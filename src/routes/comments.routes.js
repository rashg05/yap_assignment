const express = require("express");
const { commentsController } = require("../controllers");

const commentsRoutes = express.Router({mergeParams: true});

commentsRoutes.post('/', commentsController.addComments);
commentsRoutes.get('/', commentsController.getCommentsList);
commentsRoutes.get('/:comment_id', commentsController.getCommentById);
commentsRoutes.delete('/:comment_id', commentsController.deleteOneComment);
commentsRoutes.put('/:comment_id', commentsController.updateOneComment);

module.exports = commentsRoutes;
