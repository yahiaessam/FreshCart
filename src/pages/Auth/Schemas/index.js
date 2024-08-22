"use strict";
import * as Yup from "yup";

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const phoneRules =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;



export const registerSchema = Yup.object().shape({

  name: Yup.string()
    .max(20, "name should not exceed 20 characters")
    .required("name is required *"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("email is required *"),
  password: Yup.string()
    .min(8)
    .matches(passwordRules, { message: "please create a stronger password" })
    .required("password is required *"),
  rePassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("please confirm your password *"),
  phone: Yup.string().matches(phoneRules, "Phone number is not valid"),

});

export const loginSchema = Yup.object().shape({

  email: Yup.string()
    .email("Please enter a valid email")
    .required("email is required *"),
  password: Yup.string()
    .min(8)
    .matches(passwordRules, { message: "please create a stronger password" })
    .required("password is required *"),

});