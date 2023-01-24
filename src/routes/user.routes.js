const express = require("express");
const { userController } = require("../controllers");
const postsRoutes = require('./posts.routes');

const userRoutes = express.Router({});

userRoutes.post("/", userController.addOne);
userRoutes.get("/", userController.getList);
userRoutes.get("/count", userController.getListCount);
userRoutes.get("/display-settings/", userController.getConfig);
userRoutes.get('/:userId/', userController.getOne);
userRoutes.delete('/:userId', userController.deleteOne);
userRoutes.put('/:userId', userController.updateOne);
userRoutes.use('/:user_id/posts', postsRoutes);

module.exports = userRoutes;
