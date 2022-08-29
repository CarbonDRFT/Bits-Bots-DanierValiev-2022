import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Email is not valid").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const registerSchema = Yup.object().shape({
  email: Yup.string().email("Email is not valid").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password is too short (6 characters minimum)")
    .max(24, "Password is too long (24 characters maximum)"),
  confirmpassword: Yup.string().oneOf(
    [Yup.ref("password")],
    "The passwords do not match"
  ),
});
