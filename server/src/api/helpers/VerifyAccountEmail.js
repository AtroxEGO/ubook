const crypto = require("crypto");
const pug = require("pug");
const { InsertUserCode } = require("../services/UserVerificationCodeTable");
const {
  InsertBusinessCode,
} = require("../services/BusinessVerificationCodeTable");
const { SendEmail } = require("./Email");
const { QueryUserVerificationEmailData } = require("../services/UserTable");
const {
  QueryBusinessVerificationEmailData,
} = require("../services/BusinessTable");

const SendVerificationCode = async (userID, accountType) => {
  const code = GenerateCode();
  const insertID =
    accountType === "user"
      ? await InsertUserCode(userID, code)
      : await InsertBusinessCode(userID, code);

  const emailData =
    accountType === "user"
      ? await QueryUserVerificationEmailData(userID)
      : await QueryBusinessVerificationEmailData(userID);

  await SendVerificationEmail(emailData, code, accountType);
};

const GenerateCode = () => {
  const min = 100000; // Smallest 6-digit number
  const max = 999999; // Largest 6-digit number

  const randomBytes = crypto.randomBytes(4); // Generate 4 random bytes
  const randomNumber =
    Math.floor((randomBytes.readUInt32BE(0) / 0xffffffff) * (max - min + 1)) +
    min;

  return randomNumber.toString();
};

const SendVerificationEmail = (emailData, code, accountType) => {
  console.log(emailData);
  const codeArray = code.split("").map(Number);

  const emailOptions = {
    to: emailData.email, // Recipient's email address
    subject: "Email Verification | UBook", // Email subject
    html: pug.renderFile("src/api/views/verificationCode.pug", {
      firstName: emailData.first_name,
      list: codeArray,
      accountType: accountType,
    }), // HTML content of the email
  };

  SendEmail(emailOptions);
};

module.exports = { SendVerificationCode };
