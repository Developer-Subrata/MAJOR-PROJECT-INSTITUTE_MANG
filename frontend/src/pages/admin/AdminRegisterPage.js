import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Box,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  TextField,
  CssBaseline,
  IconButton,
  InputAdornment,
  CircularProgress,
  Fade,
  Button,  
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import bgpic from "../../assets/login2.png";
import { LightPurpleButton } from '../../components/buttonStyles';
import { registerUser } from '../../redux/userRelated/userHandle';
import styled from 'styled-components';
import Popup from '../../components/Popup';
import emailjs from '@emailjs/browser';

const defaultTheme = createTheme({
  palette: {
    primary: { main: '#7f56da' },
    secondary: { main: '#2c2143' },
  },
  typography: { fontFamily: '"Inter", sans-serif' },
});

const AdminRegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

  const [toggle, setToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');
  const [checked, setChecked] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [adminNameError, setAdminNameError] = useState(false);
  const [schoolNameError, setSchoolNameError] = useState(false);
  const [otpError, setOtpError] = useState(false);

  const [showOtpField, setShowOtpField] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpInput, setOtpInput] = useState('');

  const [formValues, setFormValues] = useState({
    name: '',
    schoolName: '',
    email: '',
    password: '',
  });

  const role = 'Admin';

  useEffect(() => {
    setChecked(true);
  }, []);

  // Helper: Generate 6 digit OTP
  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Environment variables for EmailJS
  const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

  // Send OTP email using EmailJS
  const sendOtpEmail = (email, otp) => {
    const templateParams = {
      email,     // Changed from to_email to email to match your EmailJS template
      passcode: otp,
        time: new Date(new Date().getTime() + 15 * 60000).toLocaleTimeString(), // optional: 15 min expiry time string
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then(() => {
        setMessage(`OTP sent to ${email}`);
        setShowPopup(true);
      })
      .catch((err) => {
        setMessage(`Failed to send OTP email: ${err.text || err.message}`);
        setShowPopup(true);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = event.target.adminName.value.trim();
    const schoolName = event.target.schoolName.value.trim();
    const email = event.target.email.value.trim();
    const password = event.target.password.value;

    let hasError = false;

    if (!name) {
      setAdminNameError(true);
      hasError = true;
    }
    if (!schoolName) {
      setSchoolNameError(true);
      hasError = true;
    }
    if (!email) {
      setEmailError(true);
      hasError = true;
    }
    if (!password) {
      setPasswordError(true);
      hasError = true;
    }

    if (hasError) return;

    setFormValues({ name, schoolName, email, password });

    const otp = generateOtp();
    setGeneratedOtp(otp);
    sendOtpEmail(email, otp);

    setShowOtpField(true);
  };

  const handleVerifyOtp = () => {
    if (otpInput === generatedOtp) {
      setOtpError(false);
      setLoader(true);

      const { name, schoolName, email, password } = formValues;
      const fields = { name, email, password, role, schoolName };
      dispatch(registerUser(fields, role));
    } else {
      setOtpError(true);
      setMessage('Invalid OTP, please try again.');
      setShowPopup(true);
    }
  };

  const handleResendOtp = () => {
    const otp = generateOtp();
    setGeneratedOtp(otp);
    sendOtpEmail(formValues.email, otp);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') setEmailError(false);
    if (name === 'password') setPasswordError(false);
    if (name === 'adminName') setAdminNameError(false);
    if (name === 'schoolName') setSchoolNameError(false);
    if (name === 'otp') {
      setOtpError(false);
      setOtpInput(value);
    }
  };

  useEffect(() => {
    if (status === 'success' || (currentUser !== null && currentRole === 'Admin')) {
      setLoader(false);
      navigate('/Admin/dashboard');
    } else if (status === 'failed') {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === 'error') {
      console.error(error);
    }
  }, [status, currentUser, currentRole, navigate, error, response]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh', overflow: 'hidden' }}>
                <CssBaseline />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{ zIndex: 1 }}>
                    <Fade in={checked} timeout={800}>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography variant="h4" sx={{ mb: 2, color: "#2c2143", fontWeight: 'bold' }}>
                                Admin Register
                            </Typography>
                            <Typography variant="subtitle1" sx={{ color: '#666', textAlign: 'center', mb: 4 }}>
                                Create your own school by registering as an admin.
                                <br />
                                You will be able to add students and faculty and
                                manage the system.
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2, width: '100%' }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="adminName"
                                    label="Enter your name"
                                    name="adminName"
                                    autoComplete="name"
                                    autoFocus
                                    error={adminNameError}
                                    helperText={adminNameError && 'Name is required'}
                                    onChange={handleInputChange}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="schoolName"
                                    label="Create your school name"
                                    name="schoolName"
                                    autoComplete="off"
                                    error={schoolNameError}
                                    helperText={schoolNameError && 'School name is required'}
                                    onChange={handleInputChange}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Enter your email"
                                    name="email"
                                    autoComplete="email"
                                    error={emailError}
                                    helperText={emailError && 'Email is required'}
                                    onChange={handleInputChange}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type={toggle ? 'text' : 'password'}
                                    id="password"
                                    autoComplete="current-password"
                                    error={passwordError}
                                    helperText={passwordError && 'Password is required'}
                                    onChange={handleInputChange}
                                    sx={{ mb: 2 }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton 
                                                    onClick={() => setToggle(!toggle)}
                                                    edge="end"
                                                >
                                                    {toggle ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                    sx={{ mb: 2 }}
                                />
                                <LightPurpleButton
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ 
                                        mt: 3, 
                                        mb: 2,
                                        py: 1.5,
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                        textTransform: 'none',
                                        borderRadius: '8px',
                                        boxShadow: '0 2px 10px rgba(127, 86, 218, 0.2)',
                                        '&:hover': {
                                            boxShadow: '0 4px 12px rgba(127, 86, 218, 0.3)',
                                        }
                                    }}
                                >
                                    {loader ? <CircularProgress size={24} color="inherit" /> : "Register"}
                                </LightPurpleButton>
                                <Grid container justifyContent="center" sx={{ mt: 2 }}>
                                    <Typography variant="body2">
                                        Already have an account?{' '}
                                        <StyledLink to="/Adminlogin">
                                            Log in
                                        </StyledLink>
                                    </Typography>
                                </Grid>
                            </Box>
                        </Box>
                    </Fade>
                </Grid>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${bgpic})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0,0,0,0.1)',
                        },
                    }}
                />
            </Grid>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </ThemeProvider>
    );
}

export default AdminRegisterPage;

const StyledLink = styled(Link)`
  font-weight: 700;
  color: #2c2143;
  font-family: 'Inter', sans-serif;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #7f56da;
    text-decoration: underline;
  }
`;

export default AdminRegisterPage;
