import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillLock,
} from "react-icons/ai";
import React from "react";
import styled from "styled-components";
import { InputAdornment, TextField } from "@material-ui/core";

const PasswordWrapper = styled.span`
  position: absolute;
  right: 10px;
  font-size: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
`;

const PasswordWithToggle = ({
  name,
  value,
  placeholder,
  onType,
  error,
  helperText,
}) => {
  const [seePassword, setSeePassword] = React.useState(false);
  const toggleSeeUnseen = () => {
    setSeePassword(!seePassword);
  };
  return (
    <div
      style={{
        position: "relative",
        maxWidth: "380px",
        width: "100%",
        marginTop: "20px",
      }}
    >
      <TextField
        fullWidth
        required
        type={seePassword ? "text" : "password"}
        style={{ maxWidth: "380px" }}
        id="outlined-required"
        label={placeholder || "Password"}
        variant="outlined"
        value={value}
        onChange={onType}
        name={name || "password"}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AiFillLock />
            </InputAdornment>
          ),
        }}
        error={error}
        helperText={helperText}
      />
      <PasswordWrapper>
        {!seePassword ? (
          <span onClick={toggleSeeUnseen}>
            <AiOutlineEye />
          </span>
        ) : (
          <span onClick={toggleSeeUnseen}>
            <AiOutlineEyeInvisible />
          </span>
        )}
      </PasswordWrapper>
    </div>
  );
};

export default PasswordWithToggle;
