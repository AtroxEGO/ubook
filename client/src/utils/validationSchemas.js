import * as yup from "yup";
import { isValidFileType, patternTwoDigisAfterComma } from "./helpers";
import moment from "moment";

const emailNotLongEnough = "Email must be at least 3 characters";
const nameNotLongEnough = "Name must be at least 3 characters";
const wrongNameLength =
  "Service name musts be between 10 and 100 characters long!";
const wrongDescLength =
  "Description musts be between 10 and 500 characters long!";
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

export const serviceCreationSchema = yup.object().shape({
  name: yup
    .string()
    .min(10, wrongNameLength)
    .max(100, wrongNameLength)
    .required("Please enter name of the service!"),
  description: yup
    .string()
    .min(10, wrongDescLength)
    .max(500, wrongDescLength)
    .required("Please enter description of the service!"),
  subcategory: yup
    .number()
    .positive("Subcategory id musts be positive!")
    .required("Please select subcategory!"),
  image: yup
    .mixed()
    .required("Required")
    .test("is-valid-type", "Not a valid image type", (value) =>
      isValidFileType(value && value.name.toLowerCase(), "image")
    )
    .test(
      "is-valid-size",
      "Max allowed size is 1Mb",
      (value) => value && value.size <= 1024000
    )
    .required("Please select image for the service!"),
  price: yup
    .number()
    .test(
      "is-decimal",
      "The amount should be a decimal with maximum two digits after comma",
      (val) => {
        if (val !== undefined) {
          return patternTwoDigisAfterComma.test(val);
        }
        return true;
      }
    )
    .positive()
    .required("Please specify price for the service!"),
  duration: yup
    .number()
    .integer("Duration must be full minutes")
    .max(1440, "Duration must be less than 24h")
    .positive()
    .required("Please specify duration of the service!"),
  gap: yup
    .number()
    .positive()
    .integer()
    .required("Please specify time gap between services!"),
  serviceHourStart: yup
    .string()
    .max(5)
    .min(5)
    .test(
      "is-before-serviceHourEnd",
      "Service start time must be before service end time",
      function (value) {
        const { serviceHourEnd } = this.parent;
        return moment(value, "HH:mm").isBefore(moment(serviceHourEnd, "HH:mm"));
      }
    )
    .required("Please specify start of service hours!"),
  serviceHourEnd: yup
    .string()
    .max(5)
    .min(5)
    .required("Please specify end of service hours!"),
});
