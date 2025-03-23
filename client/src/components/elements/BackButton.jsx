import { Box } from "@material-ui/core";

import { FiChevronLeft } from "react-icons/fi";
import { useHistory } from "react-router";
import styled from "styled-components";

const Backbutton = ({ path }) => {
  const BackButton = styled.div`
    color: #949494;
    border-radius: 4px;
    background-color: #f1f0f4;
    width: 30px;
    aspect-ratio: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    &:hover {
      background-color: #e7e7e7;
    }
  `;

  const history = useHistory();
  const goBackNow = () => {
    history.goBack();
  };
  return (
    <BackButton onClick={goBackNow}>
      <FiChevronLeft />
    </BackButton>
  );
};

export default Backbutton;
