const yup = require("yup");

const ReviewAddSchema = yup.object().shape({
  serviceID: yup
    .number("Code needs to be an number!")
    .integer("Code needs to be an integer")
    .positive()
    .required("Please enter the verification code!"),
  review: yup.number().integer().positive().max(5).required(),
});

module.exports = { ReviewAddSchema };
