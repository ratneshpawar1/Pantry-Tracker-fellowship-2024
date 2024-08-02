// components/Header.js
"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { DarkModeToggle } from "./DarkModeToggle";

export const Header = ({ theme, handleThemeChange }) => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" p={2} borderBottom="1px solid #ddd">
      <Typography variant="h4">Pantry Tracker</Typography>
      <DarkModeToggle checked={theme === "dark"} onChange={handleThemeChange} />
    </Box>
  );
};
