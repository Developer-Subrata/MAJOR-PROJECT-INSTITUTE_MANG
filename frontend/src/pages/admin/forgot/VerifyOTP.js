import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("resetEmail");

  const API_BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleVerify = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (res.ok) {

        console.log("OTP verified. Saving to localStorage");
        localStorage.setItem("resetEmail", email);
        localStorage.setItem("resetOtp", otp);
        
        navigate("/reset-password");
      } else {
        setMessage(data.message || "Invalid OTP.");
      }
    } catch (err) {
      setMessage("Something went wrong.");
    }
  };


  return (
    <Box component={Paper} elevation={3} sx={styles.container}>
      <Typography variant="h5" gutterBottom>Verify OTP</Typography>
      <TextField
        label="Enter OTP"
        variant="outlined"
        fullWidth
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        sx={styles.input}
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleVerify}>
        Verify
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

export default VerifyOTP;




