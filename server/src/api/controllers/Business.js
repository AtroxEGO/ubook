const Error = require("../helpers/Error");
const Notification = require("../helpers/Notification");
const errorMessages = require("../helpers/ErrorMessages");
const moment = require("moment");
const bcrypt = require("bcrypt");
const { CheckIfRecordExists } = require("../services/UserTable");
const config = require("../../config/config");
const { CreateToken } = require("../helpers/Token");
const { SendVerificationCode } = require("../helpers/VerifyAccountEmail");
const {
  InsertBusiness,
  QueryBusinessDataFromEmail,
  UpdateBusinessVerified,
  QueryBusinessDataFromID,
} = require("../services/BusinessTable");
const {
  QueryBusinessCode,
  DeleteBusinessCode,
} = require("../services/BusinessVerificationCodeTable");

const CreateBusiness = async (req, res) => {
  // Check if user with given email exists
  if (await CheckIfRecordExists("businesses", "email", req.body.email)) {
    return res.status(409).json(Error(errorMessages.duplicateEmail, "email"));
  }

  // Hash password
  req.body.password = await bcrypt.hash(req.body.password, config.saltRounds);

  // Insert Business into database
  const businessID = await InsertBusiness(req.body);

  // Send Verification Code
  SendVerificationCode(businessID, "business");

  // Return newly created JWT Token
  return res.json({
    message: "Successfully created the account!",
    token: await CreateToken(businessID, "business"),
    type: "success",
  });
};

const LoginBusiness = async (req, res) => {
  const businessData = await QueryBusinessDataFromEmail(req.body.email);

  if (!businessData)
    return res.status(401).send(Error("Invalid email or password!", "form"));

  const passwordMatches = await bcrypt.compare(
    req.body.password,
    businessData?.password
  );
  if (passwordMatches) {
    return res.json({
      message: "Successfully logged in!",
      token: await CreateToken(businessData.id, "business"),
      type: "success",
    });
  }

  return res.status(401).send(Error("Invalid email or password!", "form"));
};

const VerifyBusinessAccount = async (req, res) => {
  const providedCode = req.body.code;
  const userID = req.userData.id;
  const businessCode = await QueryBusinessCode(userID);

  // Check if account has code active
  if (!businessCode) {
    return res
      .status(400)
      .json(Error("Account doesn't have a code active!", "code"));
  }

  // Check if provided code is valid
  if (providedCode !== businessCode.verification_code) {
    return res.status(400).json(Error("Invalid code!", "code"));
  }

  // Check if code is expired
  const codeIssuedAt = moment(businessCode.timestamp);
  const now = moment(moment.now());
  const difference = now.diff(codeIssuedAt, "minutes");
  if (difference > config.verificationCodeValidDuration) {
    await SendVerificationCode(userID, "business");
    return res
      .status(410)
      .json(
        Error(
          `Code expired after ${config.verificationCodeValidDuration} minutes! Email with new code was sent!`
        )
      );
  }

  await DeleteBusinessCode(userID);
  await UpdateBusinessVerified(userID);
  res.json({
    token: await CreateToken(userID, "business"),
    message: "Successfully verified!",
    type: "success",
  });
};

const ResendBusinessEmailVerificationCode = async (req, res) => {
  const userID = req.userData.id;
  const result = await QueryBusinessDataFromID(userID);
  const isVerified = result.verified === 1;

  if (isVerified)
    return res.status(400).json(Error("Account already verified!", "general"));

  await SendVerificationCode(userID, "business");

  res.json(Notification(`Email was resent to: ${result.email}!`, "general"));
};

module.exports = {
  CreateBusiness,
  LoginBusiness,
  VerifyBusinessAccount,
  ResendBusinessEmailVerificationCode,
};
