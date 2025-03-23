import { Box, Grid, IconButton, TextField, Button } from "@material-ui/core";
import styled from "styled-components";
import ArrowBackIosNewIcon from "@material-ui/icons/ArrowBackIosRounded";
import Forgot from "../../assets/forgot.png";
import React, { useState } from "react";
import { ResetPasswordService } from "../../services/AuthService";
import { store } from "react-notifications-component";
import { useHistory, useParams } from "react-router-dom";
import { VerifyTokenService } from "../../services/AuthService";

const CardWrapper = styled(Box)`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  position: relative;
`;

const Card = styled(Box)`
  width: 350px;
  min-height: 200px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;
`;

const CardHead = styled(Box)`
  background-color: #fff;
  height: 10%;
  padding: 10px;
`;

const CardTitle = styled(Box)`
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  height: 100%;
  font-weight: bold;
  color: #575757;
`;

const CardBody = styled(Box)`
  background-color: #fff;
  height: 90%;
`;

const CardImg = styled(Box)`
  background-color: #fff;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardDesc = styled(Box)`
  padding: 20px;
  text-align: center;
  color: #575757;
`;

const CardForm = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 20px;
  > div {
    width: 100%;
  }
  fieldset {
    top: 0;
  }
  label {
    background-color: #fff;
    padding: 0px 4px;
  }
  button {
    width: 100%;
    margin-top: 10px;
  }
`;

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVerified, setIsVerified] = useState(true);
  const history = useHistory();
  const notify = (title, message, type, duration) => {
    store.addNotification({
      title,
      message,
      type,
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: duration || 6000,
        onScreen: true,
      },
    });
  };

  const changePassword = async (e) => {
    const res = await ResetPasswordService({
      email,
      password,
      confirmPassword,
    });
    console.log(res);
    if (res?.data.status === "success") {
      notify(
        "Success",
        "Password has been changed successfully! Please re-login to continue.",
        "success",
        3000
      );
      history.push("/signup");
    } else {
      notify("Error", res.message ? res.message : "Unexpected error", "danger");
    }
  };

  const userEmail = useParams().email;
  const token = useParams().token;

  const verifyUser = async () => {
    if (token && userEmail) {
      const res = await VerifyTokenService({
        confirmationCode: token,
        email: userEmail,
      });
      if (res.status === 200) {
        setIsVerified(true);
      } else {
        setIsVerified(false);
      }
    }
  };

  React.useEffect(() => {
    verifyUser();
  }, []);

  React.useEffect(() => {
    setEmail(userEmail);
  }, [userEmail]);
  return (
    <Box>
      <Box class="animation-area">
        {" "}
        {/* <LoginOrSignup /> */}
        <CardWrapper>
          <Card>
            <CardHead>
              <Grid container style={{ height: "100%" }}>
                <Grid item xs={3}>
                  <IconButton onClick={() => history.push("/signup")}>
                    <ArrowBackIosNewIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={9}>
                  <CardTitle>Reset Password</CardTitle>
                </Grid>
              </Grid>
            </CardHead>
            <CardBody style={{ paddingTop: "40px" }}>
              {isVerified ? (
                <CardForm>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        style={{ width: "100%" }}
                        id="outlined-required"
                        label="Email Address"
                        variant="outlined"
                        value={email}
                        disabled
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        style={{ width: "100%" }}
                        required
                        type="password"
                        id="outlined-required"
                        label="Password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} style={{ paddingBottom: "20px" }}>
                      <TextField
                        style={{ width: "100%" }}
                        required
                        type="password"
                        id="outlined-required"
                        label="Confirm Password"
                        variant="outlined"
                        value={confirmPassword}
                        autoComplete="off"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </Grid>
                  </Grid>

                  <Button
                    style={{ background: "#14adde", color: "#fff" }}
                    variant="contained"
                    onClick={changePassword}
                    size="large"
                  >
                    Change Password
                  </Button>
                </CardForm>
              ) : (
                <CardForm style={{ fontSize: "1.5rem", color: "#575757" }}>
                  Invalid Token
                </CardForm>
              )}
            </CardBody>
          </Card>
        </CardWrapper>
        <ul class="box-area">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </Box>
    </Box>
  );
}
