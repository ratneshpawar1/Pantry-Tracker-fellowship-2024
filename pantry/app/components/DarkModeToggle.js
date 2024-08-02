// components/DarkModeToggle.js
"use client";
import React from "react";
import { Switch, Box } from "@mui/material";
import { styled } from "@mui/system";

const AnimatedSwitch = styled(Switch)(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 1,
    margin: 1,
    transform: "translateX(0px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(16px)",
      "& .MuiSwitch-thumb:before": {
        content: '"🌜"',
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        fontSize: "18px", // Adjust icon size
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 24,
    height: 24,
    borderRadius: 12,
    position: "relative",
    "&:before": {
      content: '"🌞"',
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      fontSize: "18px", // Adjust icon size
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 13,
  },
}));

export const DarkModeToggle = ({ checked, onChange }) => {
  return (
    <Box display="flex" alignItems="center">
      <AnimatedSwitch checked={checked} onChange={onChange} />
    </Box>
  );
};
