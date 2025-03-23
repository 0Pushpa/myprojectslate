import React, { useEffect } from "react";
import { GetDataStatForDashBoard } from "services/DataStatServices";
import CompressionStatus from "./CompressionStatus";
import { useHistory } from "react-router-dom";

export default function CompressionStatusData() {
  const history = useHistory();
  const [data, setData] = React.useState("");
  const [before, setBefore] = React.useState();
  const [after, setAfter] = React.useState();
  const [final, setFinal] = React.useState();

  const getDataForStatus = async () => {
    const res = await GetDataStatForDashBoard({});
    if (res?.status === 200) {
      setData(res.data?.dataforstat);
      console.log(res.data, "datatat");
    } else {
      history.push("/404");
    }
  };

  useEffect(() => {
    getDataForStatus();
  }, []);

  return (
    <div>
      <CompressionStatus data={data} />
    </div>
  );
}
