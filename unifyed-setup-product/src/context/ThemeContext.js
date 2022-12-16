import React from "react";
import { baseTheme } from "themes";
export const ThemeContext = React.createContext();

export default ({ children }) => {
  const [theme, setTheme] = React.useState(baseTheme);

  const defaultContext = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={defaultContext}>
      {children}
    </ThemeContext.Provider>
  );
};
