// components/Header.js
import React from "react";
import { Typography, Box } from "@mui/material";

export const Header = () => (
  <Box display="flex" justifyContent="center" py={2}>
    <Typography variant="h2">Pantry Tracker</Typography>
  </Box>
);
