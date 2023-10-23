const express = require("express");
const router = express.Router();
const validation = require("../middlewares/ValidationMiddleware");
const { CreateUser, LoginUser } = require("../controllers/User");

// Create user account (returns JWT Token)
const { userSchema } = require("../validations/UserValidation");
router.post("/create", [validation(userSchema)], CreateUser);

// Login into user account (returns JWT Token)
const { loginUserSchema } = require("../validations/UserValidation");
router.post("/login", [validation(loginUserSchema)], LoginUser);

// Verify Business Account (returns JWT Token)
router.post(
  "/verify",
  [TokenVerifier, validation(VerificationCodeSchema)],
  VerifyUserAccount
);

// Resends email verification code (returns Notification)
router.get("/resendCode", TokenVerifier, ResendUserEmailVerificationCode);

module.exports = { UserRouter: router };
