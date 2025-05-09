import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { calculateOverallAttendancePercentage } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import styled from 'styled-components';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import Subject from "../../assets/subjects.svg";
import Assignment from "../../assets/assignment.svg";
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { motion } from 'framer-motion';

const StudentHomePage = () => {
    const dispatch = useDispatch();
    const { userDetails, currentUser, loading, response } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);

    const [subjectAttendance, setSubjectAttendance] = useState([]);
    const classID = currentUser?.sclassName?._id;

    useEffect(() => {
        if (currentUser?._id) {
            dispatch(getUserDetails(currentUser._id, "Student"));
        }
        if (classID) {
            dispatch(getSubjectList(classID, "ClassSubjects"));
        }
    }, [dispatch, currentUser?._id, classID]);

    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const numberOfSubjects = subjectsList?.length || 0;
    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>

                {/* Total Subjects */}
                <Grid item xs={12} md={4} lg={4}>
                    <MotionPaper
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <img src={Subject} alt="Subjects" height={64} />
                        <Title>Total Subjects</Title>
                        <Data start={0} end={numberOfSubjects} duration={2.5} />
                    </MotionPaper>
                </Grid>

                {/* Total Assignments */}
                <Grid item xs={12} md={4} lg={4}>
                    <MotionPaper
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <img src={Assignment} alt="Assignments" height={64} />
                        <Title>Total Assignments</Title>
                        <Data start={0} end={15} duration={4} />
                    </MotionPaper>
                </Grid>

                {/* Attendance Chart */}
                <Grid item xs={12} md={4} lg={4}>
                    <MotionPaper
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        {response ? (
                            <Typography variant="h6">No Attendance Found</Typography>
                        ) : loading ? (
                            <Typography variant="h6">Loading...</Typography>
                        ) : subjectAttendance.length > 0 ? (
                            <CustomPieChart data={chartData} />
                        ) : (
                            <Typography variant="h6">No Attendance Found</Typography>
                        )}
                    </MotionPaper>
                </Grid>

                {/* Notices */}
                <Grid item xs={12}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
                            <SeeNotice />
                        </Paper>
                    </motion.div>
                </Grid>

            </Grid>
        </Container>
    );
};

// Motion-styled components
const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 16px;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, background-color 0.3s ease;

  &:hover {
    background-color:rgb(0, 113, 212); /* light blue on hover */
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }
`;


const MotionPaper = motion(StyledPaper);

const Title = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 0.5rem;
`;

const Data = styled(CountUp)`
  font-size: calc(1.3rem + 0.6vw);
  color: black;
  font-weight: bold;
`;



export default StudentHomePage;