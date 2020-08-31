import React from "react";
const themeContext = React.createContext({
  theme: "dark",
  setTheme: () => {},
});
export default themeContext;
