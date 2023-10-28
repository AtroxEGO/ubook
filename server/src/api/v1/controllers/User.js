const Error = require("../helpers/Error");
const errorMessages = require("../helpers/ErrorMessages");
const moment = require("moment");
const bcrypt = require("bcrypt");
const {
  InsertUser,
  CheckIfRecordExists,
  QueryUserDataFromEmail,
  QueryUserDataFromID,
  UpdateUserVerified,
} = require("../services/UserTable");
const config = require("../../../config/config");
const { CreateToken } = require("../helpers/Token");
const { SendVerificationCode } = require("../helpers/VerifyAccountEmail");
const {
  QueryUserCode,
  DeleteUserCode,
} = require("../services/UserVerificationCodeTable");
const Notification = require("../helpers/Notification");

// Creates a new user
const CreateUser = async (req, res) => {
  // Check if user with given email exists
  if (await CheckIfRecordExists("users", "email", req.body.email)) {
    return res.status(409).json(Error(errorMessages.duplicateEmail, "email"));
  }

  // Hash password
  req.body.password = await bcrypt.hash(req.body.password, config.saltRounds);

  // Insert User into database
  const userID = await InsertUser(req.body);

  SendVerificationCode(userID, "user");

  // Return newly created JWT Token
  return res.json({
    message: "Successfully created the account!",
    token: await CreateToken(userID, "user"),
    type: "success",
  });
};

const LoginUser = async (req, res) => {
  const userData = await QueryUserDataFromEmail(req.body.email);

  if (!userData)
    return res.status(401).send(Error("Invalid email or password!", "form"));

  const passwordMatches = await bcrypt.compare(
    req.body.password,
    userData?.password
  );
  if (passwordMatches) {
    return res.json({
      message: "Successfully logged in!",
      token: await CreateToken(userData.id, "user"),
      type: "success",
    });
  }

  return res.status(401).send(Error("Invalid email or password!", "form"));
};

const VerifyUserAccount = async (req, res) => {
  const providedCode = req.body.code;
  const userID = req.userData.id;
  const userCode = await QueryUserCode(userID);

  // Check if account has code active
  if (!userCode) {
    return res
      .status(400)
      .json(Error("Account doesn't have a code active!", "code"));
  }

  // Check if provided code is valid
  if (providedCode !== userCode.verification_code) {
    return res.status(400).json(Error("Invalid code!", "code"));
  }

  // Check if code is expired
  const codeIssuedAt = moment(userCode.timestamp);
  const now = moment(moment.now());
  const difference = now.diff(codeIssuedAt, "minutes");
  if (difference > config.verificationCodeValidDuration) {
    await SendVerificationCode(userID, "user");
    return res
      .status(410)
      .json(
        Error(
          `Code expired after ${config.verificationCodeValidDuration} minutes! Email with new code was sent!`
        )
      );
  }

  await DeleteUserCode(userID);
  await UpdateUserVerified(userID);
  res.json({
    token: await CreateToken(userID, "user"),
    message: "Successfully verified!",
    type: "success",
  });
};

const ResendUserEmailVerificationCode = async (req, res) => {
  const userID = req.userData.id;
  const result = await QueryUserDataFromID(userID);
  const isVerified = result.verified === 1;

  if (isVerified)
    return res.status(400).json(Error("Account already verified!", "general"));

  await SendVerificationCode(userID, "user");

  res.json(Notification(`Email was resent to: ${result.email}!`, "general"));
};

module.exports = {
  CreateUser,
  LoginUser,
  VerifyUserAccount,
  ResendUserEmailVerificationCode,
};
