const express = require("express");
const router = express.Router();
const validation = require("../middlewares/ValidationMiddleware");
const TokenVerifier = require("../middlewares/TokenVerifier");
const {
  CreateBusiness,
  LoginBusiness,
  VerifyBusinessAccount,
  ResendBusinessEmailVerificationCode,
} = require("../controllers/Business");
const {
  businessCreateSchema,
  businessLoginSchema,
} = require("../validations/BusinessValidation");
const {
  VerificationCodeSchema,
} = require("../validations/VerificationCodeValidation");

// Create new business account (returns JWT Token)
router.post("/create", [validation(businessCreateSchema)], CreateBusiness);

// Login into business account (returns JWT Token)
router.post("/login", [validation(businessLoginSchema)], LoginBusiness);

// Verify Business Account (returns JWT Token)
router.post(
  "/verify",
  [TokenVerifier, validation(VerificationCodeSchema)],
  VerifyBusinessAccount
);

// Resends email verification code (returns Notification)
router.get("/resendCode", [TokenVerifier], ResendBusinessEmailVerificationCode);

module.exports = { BusinessRouter: router };
