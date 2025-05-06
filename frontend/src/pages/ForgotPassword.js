import React,{useState} from 'react'
import {Box,Button,TextField,Typography,Paper} from '@mui/material';
import axios from 'axios';


export default function ForgotPassword(){
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const handleSubmit= async (e)=>{

        e.preventDefault();
        try{
             
            const res=await axios.post(`http://localhost:5000/forgot-password`,{email});
           
            setMessage(res.data.message);
            setError('')
        }catch(err){
           
            setError(err.response?.data?.message || "something went wrong" );
            setMessage('');
        }


    }

    return (
        <Box component={Paper} elevation={3} sx={{ p: 4, maxWidth: 400, margin: 'auto', mt: 8 }}>
          <Typography variant="h5" mb={2}>Forgot Password</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <Button fullWidth type="submit" variant="contained" color="primary" onClick={handleSubmit}>
              Send Reset Link
            </Button>
          </form>
          {message && <Typography color="green" mt={2}>{message}</Typography>}
          {error && <Typography color="error" mt={2}>{error}</Typography>}
        </Box>
      );
    




}