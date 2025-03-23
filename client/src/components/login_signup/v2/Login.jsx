import React, { useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { authData } from "../../../redux/action/Index";
import { LoginUserService } from "../../../services/AuthService";
import "../Login_Signup.css";
import PasswordWithToggle from "../../elements/PasswordWithToggle";
import { InputAdornment, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export default function Login({ openSignUp }) {
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: null,
      password: null,
    },
  });

  const [getUserPassword, setGetUserPassword] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const userPassword = (event) => {
    setValue("password", event.target.value);
  };

  async function send(payload) {
    const res = await LoginUserService(payload);
    if (res && res.data?.status === "success") {
      // Handle successful login
      localStorage.setItem("user-token", res.data.token);
      localStorage.setItem("refresh-token", res.data.refreshToken);
      dispatch(authData(res.data.user));
      history.push("/slate");
    } else {
      console.log("Error occurred", res);

      // Handle unauthorized or other errors
      if (res?.data?.status === "unauthorized") {
        console.log("Unauthorized:", res.data.message);
      } else {
        console.log("Error message:", res?.data?.message);
      }

      // Dispatch error action
      dispatch({
        type: "LOGIN_ERROR",
        payload: res.message,
      });
    }
  }

  return (
    <form className="sign-up-form" onSubmit={handleSubmit(send)}>
      <h2 className="title">Login</h2>
      <TextField
        fullWidth
        required
        style={{ maxWidth: "380px" }}
        id="email-input"
        label="Email"
        variant="outlined"
        autoFocus
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
        onType={userPassword}
        error={Boolean(errors.password)}
        helperText={errors.password && errors.password.message}
      />
      <input type="submit" value="Login" className="btn solid" />
      <p className="social-text">
        <Link style={{ color: "#0f9ce0" }} to="/forgot-password">
          Forgot Password?
        </Link>
      </p>
    </form>
  );
}