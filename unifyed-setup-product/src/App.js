// import Sample from "components/pages/Sample/Sample";
import amplitude from "amplitude-js";
import Routes from "components/routes/Routes";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { baseTheme } from "themes";
import { applyTheme } from "themes/utils";

const initAmplitude = () => {
  amplitude.getInstance().init("6c6a611736685d92cb275b0f74986639");
};

const sendAmplitudeData = (eventType, eventProperties) => {
  amplitude.getInstance().logEvent(eventType, eventProperties);
};

let eventProperties2 = {
  user_id: "test3@gmail.com",
  location_lat: 37.77,
  location_lng: -122.39,
  ip: "127.0.0.1",
  event_properties: {
    keyString: "valueString",
    keyInt: 11,
    keyBool: true,
  },
};

initAmplitude();
sendAmplitudeData("request event from shubham", eventProperties2);

function App() {
  let history = useHistory();
  if (history.location.pathname === "/") {
    history.push("/home");
  }
  useEffect(() => {
    applyTheme(baseTheme);
  }, []);

  return (
    <div className="h-screen">
      <Routes />
    </div>
  );
}

export default App;
