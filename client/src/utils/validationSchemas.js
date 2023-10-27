import * as yup from "yup";

// const emailNotLongEnough = "email must be at least 3 characters";
// const nameNotLongEnough = "name must be at least 3 characters";
// const passwordNotLongEnough = "password must be at least 8 characters";
// const invalidEmail = "email must be a valid email";

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
