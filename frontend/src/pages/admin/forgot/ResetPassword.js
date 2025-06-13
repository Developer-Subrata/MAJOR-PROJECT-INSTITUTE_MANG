import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("")

    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const email = localStorage.getItem("resetEmail");
    const otp = localStorage.getItem("resetOtp");

    const API_BASE_URL = process.env.REACT_APP_BASE_URL;




    const handleReset = async () => {
        if (!newPassword) {
            setMessage("Please enter a new password.");
            return;
        }


        try {
            const res = await fetch(`${API_BASE_URL}/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp, newPassword }),

            });

            const data = await res.json();
            if (res.ok) {
                localStorage.removeItem("resetEmail");
                localStorage.removeItem("resetOtp");
                setMessage("Password reset successful. Redirecting...");
                setTimeout(() => navigate("/AdminLogin"), 2000);
            } else {
                setMessage(data.message || "Failed to reset password.");
            }
        } catch (err) {
            setMessage("Something went wrong.");
        }

    }



    return (
    <Box component={Paper} elevation={3} sx={styles.container}>
      <Typography variant="h5" gutterBottom>Reset Password</Typography>
      <TextField
        label="New Password"
        variant="outlined"
        type="password"
        fullWidth
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        sx={styles.input}
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleReset}>
        Reset
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


export default ResetPassword;

