import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ResetPassword(){
    const {token}=useParams();
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleReset= async (e) =>{
        e.preventDefault();
        if (newPassword !== confirmPassword){
            return setError("Passwords do not match");
        }

        try {
            const res = await axios.post(`http://localhost:5000/reset-Password/${token}`, { newPassword });
            setMessage(res.data.message);
            setError('');
            setTimeout(() => navigate('/login'), 2000);
          } catch (err) {
            setError(err.response?.data?.message || "Invalid or expired token");
            setMessage('');
          }
    }

    return (
        <Box component={Paper} elevation={3} sx={{ p: 4, maxWidth: 400, margin: 'auto', mt: 8 }}>
          <Typography variant="h5" mb={2}>Reset Password</Typography>
          <form onSubmit={handleReset}>
            <TextField
              fullWidth
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <Button fullWidth type="submit" variant="contained" color="primary">
              Reset Password
            </Button>
          </form>
          {message && <Typography color="green" mt={2}>{message}</Typography>}
          {error && <Typography color="error" mt={2}>{error}</Typography>}
        </Box>
    );
    

}