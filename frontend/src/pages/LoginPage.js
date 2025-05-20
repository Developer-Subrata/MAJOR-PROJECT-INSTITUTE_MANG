import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button, Grid, Box, Typography, Paper, Checkbox, FormControlLabel,
    TextField, CssBaseline, IconButton, InputAdornment, CircularProgress, Backdrop
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LightPurpleButton } from '../components/buttonStyles';
import styled from 'styled-components';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';
import backgroundImage from '../assets/image.png'

const customTheme = createTheme();

const LoginPage = ({ role }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

    const [toggle, setToggle] = useState(false);
    const [guestLoader, setGuestLoader] = useState(false);
    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [rollNumberError, setRollNumberError] = useState(false);
    const [studentNameError, setStudentNameError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (role === "Student") {
            const rollNum = event.target.rollNumber.value;
            const studentName = event.target.studentName.value;
            const password = event.target.password.value;

            if (!rollNum || !studentName || !password) {
                setRollNumberError(!rollNum);
                setStudentNameError(!studentName);
                setPasswordError(!password);
                return;
            }

            const fields = { rollNum, studentName, password };
            setLoader(true);
            dispatch(loginUser(fields, role));
        } else {
            const email = event.target.email.value;
            const password = event.target.password.value;

            if (!email || !password) {
                setEmailError(!email);
                setPasswordError(!password);
                return;
            }

            const fields = { email, password };
            setLoader(true);
            dispatch(loginUser(fields, role));
        }
    };

    const handleInputChange = (event) => {
        const { name } = event.target;
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
        if (name === 'rollNumber') setRollNumberError(false);
        if (name === 'studentName') setStudentNameError(false);
    };

    // const guestModeHandler = () => {
    //     const password = "zxc";
    //     setGuestLoader(true);

    //     if (role === "Admin") {
    //         dispatch(loginUser({ email: "yogendra@12", password }, role));
    //     } else if (role === "Student") {
    //         dispatch(loginUser({ rollNum: "1", studentName: "Dipesh Awasthi", password }, role));
    //     } else if (role === "Teacher") {
    //         dispatch(loginUser({ email: "tony@12", password }, role));
    //     }
    // };

    useEffect(() => {
        if (status === 'success' || currentUser !== null) {
            if (currentRole === 'Admin') navigate('/Admin/dashboard');
            else if (currentRole === 'Student') navigate('/Student/dashboard');
            else if (currentRole === 'Teacher') navigate('/Teacher/dashboard');
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
            setLoader(false);
            setGuestLoader(false);
        }
    }, [status, currentRole, navigate, error, response, currentUser]);

    return (
        <ThemeProvider theme={customTheme}>
            <CssBaseline />
            <Box
                sx={{
                    height: '100vh',
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundColor: '#210F37',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',


                }}
            >
                <Paper elevation={6} sx={{ p: 4, width: '100%', maxWidth: 600, borderRadius: '15px' }}>
                    <Box display="flex" flexDirection="column" alignItems="center" >
                        <Typography variant="h4" gutterBottom sx={{ color: 'blue', fontWeight: 'bold' }}>
                            {role} Login
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom sx={{ color: 'black', fontWeight: 'bold', fontSize: '20px' }}>
                            Welcome back! Please enter your details
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
                            {role === "Student" ? (
                                <>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="rollNumber"
                                        label="Enter your Roll Number"
                                        name="rollNumber"
                                        type="number"
                                        autoFocus
                                        error={rollNumberError}
                                        helperText={rollNumberError && 'Roll Number is required'}
                                        onChange={handleInputChange}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="studentName"
                                        label="Enter your name"
                                        name="studentName"
                                        error={studentNameError}
                                        helperText={studentNameError && 'Name is required'}
                                        onChange={handleInputChange}
                                    />
                                </>
                            ) : (
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Enter your email"
                                    name="email"
                                    autoFocus
                                    error={emailError}
                                    helperText={emailError && 'Email is required'}
                                    onChange={handleInputChange}
                                />
                            )}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={toggle ? 'text' : 'password'}
                                id="password"
                                error={passwordError}
                                helperText={passwordError && 'Password is required'}
                                onChange={handleInputChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setToggle(!toggle)}>
                                                {toggle ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Grid container justifyContent="space-between" alignItems="center">
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                                <RedLink to="/request-otp">
                                    Forgot password?
                                </RedLink>
                            </Grid>
                            {/* LOGIN BUTTON */}
                            <LightPurpleButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    borderRadius: "30px",

                                    fontSize: '15px',
                                    textTransform: 'none',
                                    py: 1.5

                                }}
                            >
                                {loader ? <CircularProgress size={24} color="inherit" /> : <span style={{ fontWeight: "bold" }}>LOGIN</span>}
                            </LightPurpleButton>
                            {role === "Admin" && (
                                <Grid sx={{ mt: 2 }}>
                                    <Typography>Don't have an account?</Typography>

                                    <Box display="flex" justifyContent="center" mt={3}>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                width: '100%', // Adjust as needed 
                                                py: 1.5,
                                                borderRadius: '30px',
                                                backgroundColor: '#7f56da',
                                                color: '#fff',
                                                fontWeight: 'bold',
                                                fontSize: '15px',
                                                textTransform: 'none',
                                                boxShadow: '0 4px 20px rgba(127, 86, 218, 0.4)',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    backgroundColor: '#5e3dbf',
                                                    boxShadow: '0 6px 24px rgba(94, 61, 191, 0.4)',
                                                },
                                            }}
                                        >
                                            <StyledLink to="/Adminregister">
                                                SIGN UP
                                            </StyledLink>
                                        </Button>
                                    </Box>

                                </Grid>
                            )}
                        </Box>
                    </Box>
                </Paper>
            </Box>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={guestLoader}
            >
                <CircularProgress color="primary" />
                &nbsp;Please Wait
            </Backdrop>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </ThemeProvider>
    );
};

export default LoginPage;


const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  width: 100%;
  display: flex;
  justify-content: center;
`;
const RedLink = styled(Link)`
  color: red;
  text-decoration: none;
  font-weight: 500;

  
  &:hover {
    text-decoration: underline;
  }
`;