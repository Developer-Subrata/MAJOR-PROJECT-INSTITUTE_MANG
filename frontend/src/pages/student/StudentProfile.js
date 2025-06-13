import React, { useState } from 'react';
import styled from 'styled-components';
import { Typography, Grid, Box, Avatar, Container, Paper, Button } from '@mui/material';
import { useSelector } from 'react-redux';

const StudentProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) console.log(response);
  else if (error) console.log(error);

  const sclassName = currentUser.sclassName;
  const studentSchool = currentUser.school;


  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <CenteredBox>
      <Container maxWidth="sm">
        <StyledPaper elevation={4}>
          <Grid container spacing={2}>

            {/* Avatar Section */}
            <Grid item xs={12}>
              <GridItemBox>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Avatar
                    alt="Student Avatar"
                    src={previewUrl || ''}
                    sx={{ width: 120, height: 120, fontSize: 50 }}
                  >
                    {!previewUrl && String(currentUser.name).charAt(0)}
                  </Avatar>
                  <input
                    accept="image/*"
                    type="file"
                    id="upload-avatar"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                  />
                  <label htmlFor="upload-avatar">
                    <Button
                      variant="outlined"
                      component="span"
                      size="small"
                      sx={{ mt: 1 }}
                    >
                      Choose Image
                    </Button>
                  </label>
                </Box>
              </GridItemBox>
            </Grid>

            {/* Name */}
            <Grid item xs={12}>
              <GridItemBox>
                <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
                  {currentUser.name}
                </Typography>
              </GridItemBox>
            </Grid>

            {/* Roll Number */}
            <Grid item xs={12}>
              <GridItemBox>
                <Typography variant="h5" align="center" fontWeight="bold">
                  Student Roll No : {currentUser.rollNum}
                </Typography>
              </GridItemBox>
            </Grid>

            {/* Class */}
            <Grid item xs={12}>
              <GridItemBox>
                <Typography variant="h5" align="center" fontWeight="bold">
                  Class : {sclassName.sclassName}
                </Typography>
              </GridItemBox>
            </Grid>

            {/* School */}
            <Grid item xs={12}>
              <GridItemBox>
                <Typography variant="h5" align="center" fontWeight="bold">
                  School : {studentSchool.schoolName}
                </Typography>
              </GridItemBox>
            </Grid>

          </Grid>
        </StyledPaper>
      </Container>
    </CenteredBox>
  );
};

export default StudentProfile;

// Styled Components
const StyledPaper = styled(Paper)`
  padding: 40px;
  border-radius: 30px;
  background-color: #ffffff;
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.1);
`;

const CenteredBox = styled(Box)`
  min-height: 90vh;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

const GridItemBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 20px;
  background-color: #fafafa;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;
