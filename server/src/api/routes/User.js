const express = require("express");
const router = express.Router();
const validation = require("../middlewares/ValidationMiddleware");
const {
  CreateUser,
  LoginUser,
  VerifyUserAccount,
  ResendUserEmailVerificationCode,
} = require("../controllers/User");

// Create user account (returns JWT Token)
const { userSchema } = require("../validations/UserValidation");
router.post("/create", [validation(userSchema)], CreateUser);

// Login into user account (returns JWT Token)
const { loginUserSchema } = require("../validations/UserValidation");
const TokenVerifier = require("../middlewares/TokenVerifier");
const {
  VerificationCodeSchema,
} = require("../validations/VerificationCodeValidation");
router.post("/login", [validation(loginUserSchema)], LoginUser);

// Verify user Account (returns JWT Token)
router.post(
  "/verify",
  [TokenVerifier, validation(VerificationCodeSchema)],
  VerifyUserAccount
);

// Resends email verification code (returns Notification)
router.get("/resendCode", [TokenVerifier], ResendUserEmailVerificationCode);

module.exports = { UserRouter: router };
