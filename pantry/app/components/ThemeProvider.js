// components/ThemeProvider.js
"use client";
import React, { useState, useMemo } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Box } from "@mui/material";
import { Header } from "./Header";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#181818",
      paper: "#181818",
    },
    text: {
      primary: "#f5f5f5",
    },
  },
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const currentTheme = useMemo(
    () => (theme === "light" ? lightTheme : darkTheme),
    [theme]
  );

  const handleThemeChange = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <MuiThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Header theme={theme} handleThemeChange={handleThemeChange} />
      <Box width="100%" height="100vh" sx={{ backgroundColor: currentTheme.palette.background.default }}>
        {children}
      </Box>
    </MuiThemeProvider>
  );
};
