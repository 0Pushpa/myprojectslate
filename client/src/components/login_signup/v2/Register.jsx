import React, { useState } from "react";
import { AiFillLock } from "react-icons/ai";
import { MdOutlineMail } from "react-icons/md";
import { RiUserFill, RiPhoneFill } from "react-icons/ri";
import { store } from "react-notifications-component";
import { Link } from "react-router-dom";
import { RegisterUserService } from "../../../services/AuthService";
import "../Login_Signup.css";
import "./style.scss";
import PasswordWithToggle from "../../elements/PasswordWithToggle";
import { InputAdornment, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export default function Registration(props) {
  const RegisterSchema = Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password is too short - should be 8 chars minimum."),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
    phoneNumber: Yup.string()
      .min(9, "Phone Number must be at least 9 characters")
      .max(10, "Phone Number must be at most 10 characters")
      .matches(/[0-9]/, "Phone number is not valid"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues: {
      name: null,
      phoneNumber: null,
      email: null,
      password: null,
      confirmPassword: null,
    },
  });

  const notify = (title, message, type) => {
    store.addNotification({
      title,
      message,
      type,
      icon: "warning",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });
  };

  const getDataForRegistration = (e) => {
    switch (e.target.name) {
      case "password":
        setValue("password", e.target.value);
        break;
      case "confirm-password":
        setValue("confirmPassword", e.target.value);
        break;
      default:
        console.log("Error");
    }
  };

  const registerData = async (payload) => {
    const res = await RegisterUserService(payload);
    if (res && res?.data?.status === "success") {
      localStorage.setItem("user-details", res);
      // clearForm();
      props.toggler();
      notify(
        "Registered Successfully",
        "Please check your email to verify your account",
        "info"
      );
    } else {
      console.log(res);
      notify("Error Occurred", res?.data?.message, "danger");
    }
  };

  return (
    <form class="sign-in-form" onSubmit={handleSubmit(registerData)}>
      <h2 class="title">Create your account</h2>
      <TextField
        fullWidth
        required
        autoFocus
        style={{ maxWidth: "380px", marginTop: "10px" }}
        id="outlined-required"
        label="Name"
        variant="outlined"
        {...register("name")}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <RiUserFill />
            </InputAdornment>
          ),
        }}
        error={Boolean(errors.name)}
        helperText={errors.name && errors.email.name}
      />
      <TextField
        fullWidth
        style={{ marginTop: "20px", maxWidth: "380px" }}
        id="outlined-required"
        label="Phone Number"
        variant="outlined"
        {...register("phoneNumber")}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <RiPhoneFill />
            </InputAdornment>
          ),
        }}
        error={Boolean(errors.phoneNumber)}
        helperText={errors.phoneNumber && errors.phoneNumber.message}
      />

      <TextField
        fullWidth
        required
        style={{ marginTop: "20px", maxWidth: "380px" }}
        id="outlined-required"
        label="Email"
        variant="outlined"
        {...register("email")}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MdOutlineMail />
            </InputAdornment>
          ),
        }}
        error={Boolean(errors.email)}
        helperText={errors.email && errors.email.message}
      />
      <PasswordWithToggle
        name="password"
        onType={getDataForRegistration}
        error={Boolean(errors.password)}
        helperText={errors.password && errors.password.message}
      />
      <PasswordWithToggle
        name="confirm-password"
        onType={getDataForRegistration}
        placeholder="Confirm Password"
        error={Boolean(errors.confirmPassword)}
        helperText={errors.confirmPassword && errors.confirmPassword.message}
      />

      <input type="submit" class="btn" value="Sign up" />
      <p class="social-text" onClick={() => props.toggler()}>
        Already have an account ?{" "}
        <span
          style={{ color: "#0f9ce0", cursor: "pointer" }}
          onClick={() => props.toggler()}
        >
          Sign In
        </span>
      </p>
      {/* <div class="social-media">
        <a href="https://www.facebook.com" className="social">
          <FaFacebookF />
        </a>
        <a href="https://www.instagram.com" className="social">
          <FaInstagram />
        </a>
        <a href="https://www.google.com" className="social">
          <FaGoogle />
        </a>
      </div> */}
    </form>
  );
}
