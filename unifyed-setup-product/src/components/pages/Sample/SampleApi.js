import axios from "axios";
import { useEffect, useState } from "react";

function SampleApi(props) {
  const [state, setState] = useState("");

  const getData = () => {
    axios.get(props.url).then((res) => {
      setState(res.data);
    });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1> Axios Test </h1>
      {state ? <p data-testid="title">{state.title}</p> : <p>...Loading</p>}
    </div>
  );
}

export default SampleApi;
