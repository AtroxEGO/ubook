import * as yup from "yup";

const emailNotLongEnough = "Email must be at least 3 characters";
const nameNotLongEnough = "Name must be at least 3 characters";
// const passwordNotLongEnough = "Password must be at least 8 characters";
const invalidEmail = "Enter valid email address";

export const loginFormSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  accountType: yup.string().required(),
});

export const userCreateSchema = yup.object().shape({
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
  firstName: yup
    .string()
    .min(3, nameNotLongEnough)
    .max(20)
    .required("Please enter your First Name"),
  lastName: yup
    .string()
    .min(3, nameNotLongEnough)
    .max(30)
    .required("Please enter your Last Name"),
  avatar_url: yup.string().max(300),
  allowsMarketing: yup
    .boolean()
    .required("Please specify if u allow marketing!"),
});

export const businessCreateSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, emailNotLongEnough)
    .max(100)
    .email(invalidEmail)
    .required("Please enter your email"),
  password: yup
    .string()
    .required("Please Enter your password")
    .matches(/^.{8,16}$/, "Password musts have between 8 to 16 characters")
    .matches(/[a-z]/, "Password musts contain one lower case character!")
    .matches(/[A-Z]/, "Password musts contain one upper case character!")
    .matches(/\d/, "Password musts contain one numer!")
    .matches(
      /[@$!<>.,/\\^[\]%*?&]/,
      "Password musts contain one special character! [@$!<>.,/^\\[]%*?&]"
    ),
  businessName: yup
    .string()
    .min(3, nameNotLongEnough)
    .max(30)
    .required("Please enter your Business Name"),
  avatar_url: yup.string().max(300),
  allowsMarketing: yup
    .boolean()
    .required("Please specify if u allow marketing!"),
  address: yup.string().required("Please specify your Address"),
});

export const verifyFormSchema = yup.object({
  code: yup
    .number("Enter your verification code")
    .positive("Code must be positive")
    .min(100000, "Code must have 6 digits!")
    .max(999999, "Code must have 6 digits!")
    .required("Enter your verification code"),
});
