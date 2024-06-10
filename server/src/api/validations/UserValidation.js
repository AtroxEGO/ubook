const yup = require("yup");

const emailNotLongEnough = "email must be at least 3 characters";
const nameNotLongEnough = "name must be at least 3 characters";
const passwordNotLongEnough = "password must be at least 8 characters";
const invalidEmail = "email must be a valid email";

const userSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, emailNotLongEnough)
    .max(100)
    .email(invalidEmail)
    .required("Please enter your email"),
  password: yup
    .string()
    .required("Please Enter your password")
    .matches(/^.{8,16}$$/, "Password musts have between 8 to 16 characters")
    .matches(/[a-z]/, "Password musts contain one lower case character!")
    .matches(/[A-Z]/, "Password musts contain one upper case character!")
    .matches(/\d/, "Password musts contain one numer!")
    .matches(
      /[@$!<>.,/\\^[\]%*?&]/,
      "Password musts contain one special character! [@$!<>.,/^\\[]%*?&]"
    ),
  first_name: yup
    .string()
    .min(3, nameNotLongEnough)
    .max(20)
    .required("Please enter your First Name"),
  last_name: yup
    .string()
    .min(3, nameNotLongEnough)
    .max(30)
    .required("Please enter your Last Name"),
  avatar_url: yup.string().max(300),
  allows_marketing: yup
    .boolean()
    .required("Please specify if u allow marketing!"),
});

// ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!>.,[\]%*?&])[A-Za-z\d@$!>.,[\]%*?&]{8,16}$

const loginUserSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, emailNotLongEnough)
    .max(100)
    .email(invalidEmail)
    .required("Please enter your email"),
  password: yup.string().required("Please Enter your password"),
});

const formatYupError = (err) => {
  const error = {
    path: err.path,
    message: err.errors,
  };
  return error;
};

module.exports = { userSchema, loginUserSchema, formatYupError };
