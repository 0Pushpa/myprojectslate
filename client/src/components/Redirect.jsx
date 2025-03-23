import React from "react";
import { useHistory } from "react-router-dom";

const Redirect = () => {
  const history = useHistory();
  React.useEffect(() => {
    history.push("/slate/groups");
  }, []);
  return null;
};

export default Redirect;
