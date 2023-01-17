const express = require("express");
const { userController } = require("../controllers");

// eslint-disable-next-line new-cap
const userRoutes = express.Router({});

userRoutes.post("/", userController.addOne);
userRoutes.get("/", userController.getList);
userRoutes.get("/count", userController.getListCount);
userRoutes.get("/display-settings/", userController.getConfig);

module.exports = userRoutes;
