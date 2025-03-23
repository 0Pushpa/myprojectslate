import Loader from "components/Loader/Loader";
import { useEffect, useState } from "react";
import { Suspense } from "react";
import { useParams, useLocation } from "react-router-dom";
import { VerifyUserService } from "../../services/AuthService";
import styled from "styled-components";
import { Link } from "react-router-dom";
import NotFound from "../../assets/404.png";
import Verified from "../../assets/verified.png";
import { Button, Box } from "@material-ui/core";

const VerifyWrapper = styled.div`
  display: flex;
  padding-top: 150px;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  background-color: #f9fbfd;
`;

const Message = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
  color: #575757;
  margin-top: 10px;
`;

const EmailVerified = () => {
  const token = useParams().token;
  const email = useParams().email;
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const verifyUser = async () => {
    if (token && email) {
      const res = await VerifyUserService({ confirmationCode: token, email });
      if (res.status === 200) {
        setMessage(
          "Your email has been verified successfully. Please login to continue."
        );
        setIsError(false);
      } else if (res.status === 400) {
        setMessage("User is already verified");
        setIsError(false);
      } else {
        setMessage("User not found");
        setIsError(true);
      }
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);
  return (
    <>
      <div>
        <div class="animation-area ">
          <VerifyWrapper>
            {isError ? (
              <>
                <img src={NotFound} alt="not found" width={600} />
                <Message>{message}</Message>
                <Link to="/">
                  <Button
                    variant="contained"
                    style={{
                      background: "#5d93fe",
                      color: "#fff",
                      marginBottom: "20px",
                    }}
                  >
                    Go Back
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <img src={Verified} alt="not found" width={200} />
                <Message>{message}</Message>
                <Link to="/signup">
                  <Button
                    variant="contained"
                    style={{
                      background: "#5d93fe",
                      color: "#fff",
                      marginBottom: "20px",
                      marginTop: "10px",
                      zIndex: "99",
                    }}
                  >
                    Go To Login
                  </Button>
                </Link>
              </>
            )}
          </VerifyWrapper>
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
        </div>
      </div>
    </>
  );
};

export default EmailVerified;
