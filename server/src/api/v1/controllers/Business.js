const Error = require("../helpers/Error");
const errorMessages = require("../helpers/ErrorMessages");
const moment = require("moment");
const bcrypt = require("bcrypt");
const { CheckIfRecordExists } = require("../services/UserTable");
const config = require("../../../config/config");
const { CreateToken } = require("../helpers/Token");
const { SendVerificationCode } = require("../helpers/VerifyAccountEmail");
const {
  InsertBusiness,
  QueryBusinessDataFromEmail,
} = require("../services/BusinessTable");
const {
  QueryBusinessCode,
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
  return res.json(await CreateToken(businessID, "business"));
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
    return res.json(await CreateToken(businessData.id, "business"));
  }

  return res.status(401).send(Error("Invalid email or password!", "form"));
};

const VerifyBusinessAccount = async (req, res) => {
  const providedCode = req.body.code;
  const businessCode = await QueryBusinessCode(req.userData.id);

  // Check provided code is valid
  if (providedCode !== businessCode.verification_code) {
    return res.status(400).json(Error("Invalid code!", "code"));
  }

  // Check if code is expired
  const codeIssuedAt = moment(businessCode.timestamp);
  const now = moment(moment.now());
  const difference = now.diff(codeIssuedAt, "minutes");
  if (difference > config.verificationCodeValidDuration) {
    await SendVerificationCode(req.userData.id, "business");
    return res
      .status(410)
      .json(
        Error(
          `Code expired after ${config.verificationCodeValidDuration} minutes! Email with new code was sent!`
        )
      );
  }

  // TODO update in db and respond with jwt token

  res.json(providedCode);
};

module.exports = { CreateBusiness, LoginBusiness, VerifyBusinessAccount };
