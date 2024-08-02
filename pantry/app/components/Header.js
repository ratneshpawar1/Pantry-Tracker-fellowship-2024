// components/Header.js
"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { DarkModeToggle } from "./DarkModeToggle";
import { getNeumorphicHeaderStyles } from "./NeumorphicStyles";

export const Header = ({ theme, handleThemeChange }) => {
  return (
    <Box sx={(theme) => getNeumorphicHeaderStyles(theme)}>
      <Typography variant="h4">Pantry Tracker</Typography>
      <DarkModeToggle checked={theme === "dark"} onChange={handleThemeChange} />
    </Box>
  );
};
