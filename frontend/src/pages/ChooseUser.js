import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  Container,
  CircularProgress,
  Backdrop,
  Typography
} from '@mui/material';
import { AccountCircle, School, Group } from '@mui/icons-material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

// Styled Components (defined before component to avoid reference errors)
const ActionText = styled(Typography)`
  font-weight: 500;
  color: #a5b4fc;
  margin-top: auto;
  display: inline-block;
  transition: transform 0.3s ease;
`;

const UserCard = styled(Paper)`
  padding: 2.5rem 1.5rem;
  text-align: center;
  height: 100%;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-8px) scale(1.02);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
    color: white;
    
    ${ActionText} {
      transform: translateX(5px);
    }
  }
`;

const StyledContainer = styled.div`
  background: 
    linear-gradient(135deg, rgba(65, 29, 112, 0.9) 0%, rgba(25, 17, 139, 0.9) 100%),
    url('../assets/backg.jpg') center/cover no-repeat fixed;
  min-height: 100vh;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: -1;
  }
`;

const HeaderBox = styled(Box)`
  text-align: center;
  margin-bottom: 3rem;
  color: white;
  padding: 2rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const MainTitle = styled(Typography)`
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, #ffffff 0%, #a5b4fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(Typography)`
  opacity: 0.9;
  font-weight: 300;
  max-width: 600px;
  margin: 0 auto;
`;

const IconBox = styled(Box)`
  margin-bottom: 1.5rem;
  color: #a5b4fc;
  transition: transform 0.3s ease;
  
  ${UserCard}:hover & {
    transform: scale(1.1);
  }
`;

const UserTitle = styled(Typography)`
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;
  letter-spacing: 0.5px;
`;

const UserDescription = styled(Typography)`
  margin-bottom: 2rem;
  line-height: 1.6;
  font-size: 1rem;
`;

const LoaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const LoaderText = styled(Typography)`
  font-weight: 300;
  letter-spacing: 1px;
`;

// Main Component
const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = "zxc";

  const { status, currentUser, currentRole } = useSelector(state => state.user);

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const handleUserSelection = (user) => {
    if (user === "Admin") {
      if (visitor === "guest") {
        const email = "yogendra@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Adminlogin');
      }
    } 
    else if (user === "Student") {
      if (visitor === "guest") {
        const rollNum = "1";
        const studentName = "Dipesh Awasthi";
        const fields = { rollNum, studentName, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Studentlogin');
      }
    } 
    else if (user === "Teacher") {
      if (visitor === "guest") {
        const email = "tony@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Teacherlogin');
      }
    }
  };

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') {
        navigate('/Admin/dashboard');
      }
      else if (currentRole === 'Student') {
        navigate('/Student/dashboard');
      } else if (currentRole === 'Teacher') {
        navigate('/Teacher/dashboard');
      }
    }
    else if (status === 'error') {
      setLoader(false);
      setMessage("Network Error");
      setShowPopup(true);
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <StyledContainer>
      <HeaderBox>
        <MainTitle variant="h2">Welcome to EduPortal</MainTitle>
        <Subtitle variant="h5">
          {visitor === "guest" ? "Explore as a guest" : "Please select your role to continue"}
        </Subtitle>
      </HeaderBox>
      
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <UserCard elevation={6} onClick={() => handleUserSelection("Admin")}>
              <IconBox>
                <AccountCircle sx={{ fontSize: 60 }} />
              </IconBox>
              <UserTitle variant="h5">Administrator</UserTitle>
              <UserDescription variant="body1">
                Access the admin dashboard to manage users, courses, and system settings.
              </UserDescription>
              <ActionText>
                {visitor === "guest" ? "Try as Admin" : "Admin Login →"}
              </ActionText>
            </UserCard>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <UserCard elevation={6} onClick={() => handleUserSelection("Student")}>
              <IconBox>
                <School sx={{ fontSize: 60 }} />
              </IconBox>
              <UserTitle variant="h5">Student</UserTitle>
              <UserDescription variant="body1">
                Access your courses, submit assignments, and track your academic progress.
              </UserDescription>
              <ActionText>
                {visitor === "guest" ? "Try as Student" : "Student Login →"}
              </ActionText>
            </UserCard>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <UserCard elevation={6} onClick={() => handleUserSelection("Teacher")}>
              <IconBox>
                <Group sx={{ fontSize: 60 }} />
              </IconBox>
              <UserTitle variant="h5">Educator</UserTitle>
              <UserDescription variant="body1">
                Create courses, manage classes, and monitor student performance.
              </UserDescription>
              <ActionText>
                {visitor === "guest" ? "Try as Teacher" : "Teacher Login →"}
              </ActionText>
            </UserCard>
          </Grid>
        </Grid>
      </Container>
      
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <LoaderContent>
          <CircularProgress color="inherit" size={60} />
          <LoaderText variant="h6">Authenticating...</LoaderText>
        </LoaderContent>
      </Backdrop>
      
      <Popup 
        message={message} 
        setShowPopup={setShowPopup} 
        showPopup={showPopup} 
      />
    </StyledContainer>
  );
};

export default ChooseUser;