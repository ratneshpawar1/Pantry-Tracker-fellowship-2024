// components/GlobalStyles.js
"use client";
import React from 'react';
import { CssBaseline, GlobalStyles as MuiGlobalStyles } from '@mui/material';

const globalStyles = (
  <MuiGlobalStyles
    styles={(theme) => ({
      body: {
        margin: 0,
        padding: 0,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      },
    })}
  />
);

export const GlobalStyles = () => (
  <>
    <CssBaseline />
    {globalStyles}
  </>
);
