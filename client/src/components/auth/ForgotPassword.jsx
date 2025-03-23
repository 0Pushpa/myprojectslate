import { Box, Grid, IconButton, TextField, Button } from "@material-ui/core";
import styled from "styled-components";
import ArrowBackIosNewIcon from "@material-ui/icons/ArrowBackIosRounded";
import Forgot from "../../assets/forgot.png";
import { useState } from "react";
import { ForgotPasswordService } from "../../services/AuthService";
import { store } from "react-notifications-component";
import { useHistory } from "react-router-dom";

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
  height: 520px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  display: flex;
  flex-direction: column;
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

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const history = useHistory();
  const notify = (title, message, type) => {
    store.addNotification({
      title,
      message,
      type,
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 6000,
        onScreen: true,
      },
    });
  };

  const sendEmail = async (e) => {
    const res = await ForgotPasswordService({ email });
    console.log(res);
    if (res?.data.status == "success") {
      notify(
        "Email Sent Successfully",
        "Please check your email to reset password",
        "info"
      );
    } else {
      notify("Error", res.message ? res.message : "Unexpected error", "danger");
    }
  };
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
                  <CardTitle>Forget Password</CardTitle>
                </Grid>
              </Grid>
            </CardHead>
            <CardBody>
              <CardImg>
                <img src={Forgot} alt="" width={150} />
              </CardImg>
              <CardDesc>
                Please enter the email address you've used to register with us
                and we'll send you a reset link
              </CardDesc>
              <CardForm>
                <TextField
                  required
                  id="outlined-required"
                  label="Email Address"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  style={{ background: "#14adde", color: "#fff" }}
                  variant="contained"
                  onClick={sendEmail}
                  size="large"
                >
                  Send Link
                </Button>
              </CardForm>
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
