// components/ThemeProvider.js
"use client";
import React, { useState, useMemo } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Switch, FormControlLabel, Box } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const midnightTheme = createTheme({
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
    () => (theme === "light" ? lightTheme : midnightTheme),
    [theme]
  );

  const handleThemeChange = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <MuiThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Box display="flex" justifyContent="center" p={2}>
        <FormControlLabel
          control={<Switch checked={theme === "dark"} onChange={handleThemeChange} />}
          label="Midnight Mode"
        />
      </Box>
      {children}
    </MuiThemeProvider>
  );
};
