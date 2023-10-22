const yup = require("yup");

const VerificationCodeSchema = yup.object().shape({
  code: yup
    .number("Code needs to be an number!")
    .integer("Code needs to be an integer")
    .min(100000, "Code needs to be 6 digits long!")
    .max(999999, "Code needs to be 6 digits long!")
    .required("Please enter the verification code!"),
});

module.exports = { VerificationCodeSchema };
