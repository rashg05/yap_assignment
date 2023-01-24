const express = require("express");
const { commentsController } = require("../controllers");

const commentsRoutes = express.Router({mergeParams: true});

commentsRoutes.post('/', commentsController.addComments);
commentsRoutes.get('/', commentsController.getCommentsList);
// commentsRoutes.get('/:comment_id', commentsController.getCommentById);

module.exports = commentsRoutes;
