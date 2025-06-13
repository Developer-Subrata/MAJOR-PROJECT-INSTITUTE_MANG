import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

const RequestOTP = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleSendOTP = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/request-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });


       const data = await res.json();
      if (res.ok) {
        localStorage.setItem("resetEmail", email);
        navigate("/verify-otp");
      } else {
        setMessage(data.message || "Failed to send OTP.");
      }
    } catch (err) {
      setMessage("Something went wrong.");
    }
  };

  return (
    <Box component={Paper} elevation={3} sx={styles.container}>
      <Typography variant="h5" gutterBottom>Forgot Password</Typography>
      <TextField
        label="Enter your email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={styles.input}
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleSendOTP}>
        Send OTP
      </Button>
      <Typography color="error" sx={styles.message}>{message}</Typography>
    </Box>

    
  );



};

const styles = {
  container: {
    maxWidth: 400,
    margin: "100px auto",
    padding: 4,
    textAlign: "center",
  },
  input: {
    marginBottom: 2,
  },
  message: {
    marginTop: 2,
  },
};

export default RequestOTP;


 


  
