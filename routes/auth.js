const express = require("express");
const {
  SignUp,
  SignIn,
  GetUser,
  deleteUser,
  AddUser,
} = require("../controllers/auth");

const { isAuth } = require("../middlewares/isAuth");
const {
  RegisterValidation,
  Validation,
  LoginValidation,
} = require("../middlewares/Register");

const authRoute = express.Router();

authRoute.post("/signUp", RegisterValidation, Validation, SignUp);

authRoute.post("/signIn", LoginValidation, Validation, SignIn);

authRoute.get("/current", isAuth, (req, res) => res.send(req.user));
authRoute.get("/users", GetUser);
authRoute.delete("/:id", deleteUser);

module.exports = authRoute;
