const express = require("express");
const {
  addComment,
  GetComment,
  UpdateComment,
  DeleteComment,
} = require("../controllers/comment");
const { isAuth } = require("../middlewares/isAuth");

const commentRoute = express.Router();

commentRoute.post("/:id/addComment", isAuth, addComment);
commentRoute.get("/:id/comments", GetComment); // id mta tache
commentRoute.put("/:id", isAuth, UpdateComment);
commentRoute.delete("/:id", isAuth, DeleteComment);

module.exports = commentRoute;
