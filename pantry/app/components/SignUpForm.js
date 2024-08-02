// components/SignUpForm.js
"use client";
import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export const SignUpForm = ({ onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onSuccess();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>Sign Up</Typography>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Sign Up</Button>
    </Box>
  );
};
