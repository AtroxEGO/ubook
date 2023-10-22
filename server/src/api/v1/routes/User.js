const express = require("express");
const router = express.Router();
const validation = require("../middlewares/ValidationMiddleware");
const { CreateUser, LoginUser } = require("../controllers/User");

const { userSchema } = require("../validations/UserValidation");
router.post("/create", [validation(userSchema)], CreateUser);

const { loginUserSchema } = require("../validations/UserValidation");
router.post("/login", [validation(loginUserSchema)], LoginUser);

module.exports = { UserRouter: router };
