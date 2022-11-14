import Sample from "components/pages/Sample/Sample";
import { useEffect } from "react";
import { baseTheme } from "themes";
import { applyTheme } from "themes/utils";

function App() {
  useEffect(() => {
    applyTheme(baseTheme);
  }, []);

  return (
    <div className="App">
      <Sample />
    </div>
  );
}

export default App;
