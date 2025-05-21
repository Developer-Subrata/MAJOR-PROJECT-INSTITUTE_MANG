import React, { useEffect } from 'react';
import { getTeacherDetails } from '../../../redux/teacherRelated/teacherHandle';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Typography, Box, Paper, CircularProgress, Divider } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ClassIcon from '@mui/icons-material/Class';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AddIcon from '@mui/icons-material/Add';
import { motion } from 'framer-motion';


const fadeInVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};



const TeacherDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { loading, teacherDetails, error } = useSelector((state) => state.teacher);

    const teacherID = params.id;

    useEffect(() => {
        dispatch(getTeacherDetails(teacherID));
    }, [dispatch, teacherID]);

    if (error) {
        console.log(error);
    }

    const isSubjectNamePresent = teacherDetails?.teachSubject?.subName;

    const handleAddSubject = () => {
        navigate(`/Admin/teachers/choosesubject/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`);
    };

    return (
        <>
            <Container sx={{ mt: 6 }}>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                        <CircularProgress />


                    </Box>
                ) : (
                    <motion.div
                        variants={fadeInVariant}
                        initial="hidden"
                        animate="visible"
                    >
                        <Paper
                            elevation={4}
                            sx={{
                                padding: 4,
                                maxWidth: 600,
                                margin: 'auto',
                                borderRadius: 4,
                                backgroundColor: '#f9f9fb',
                            }}
                        >
                            <Typography variant="h4" align="center" sx={{ mb: 2, fontWeight: 'bold', color: '#3f51b5' }}>
                                 <PersonIcon fontSize="large" sx={{ mr: 1, verticalAlign: 'middle' }} />

                                Teacher Details
                            </Typography>
                             <Divider sx={{ mb: 3 }} />


                            <Box mt={2}>
                                <Typography variant="h6"  sx={{mb: 1}}>
                                    <PersonIcon sx={{ verticalAlign: 'middle', mr: 1 }}/>
                                    <strong>Name:</strong> {teacherDetails?.name}
                                </Typography>

                                <Typography variant="h6" sx={{mb: 1 }}>
                                    <ClassIcon  sx={{ verticalAlign: 'middle', mr: 1 }} />
                                    <strong>Class:</strong> {teacherDetails?.teachSclass?.sclassName}
                                </Typography>

                                {isSubjectNamePresent ? (
                                    <>
                                        <Typography variant="h6" sx={{mb: 1 }}>
                                            <MenuBookIcon sx={{  verticalAlign: 'middle', mr: 1 }} />
                                            <strong>Subject:</strong> {teacherDetails?.teachSubject?.subName}
                                        </Typography>

                                        <Typography variant="h6" sx={{mb: 1 }}>
                                            <ScheduleIcon sx={{ verticalAlign: 'middle', mr: 1}} />
                                            <strong>Sessions:</strong> {teacherDetails?.teachSubject?.sessions}
                                        </Typography>
                                    </>
                                ) : (
                                    <Box mt={3} textAlign="center">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleAddSubject}
                                            startIcon={<AddIcon />}
                                            sx={{ px: 4, py: 1 }}
                                        >
                                            Add Subject
                                        </Button>
                                    </Box>
                                )}




                            </Box>




                        </Paper>
                    </motion.div>


                )}
            </Container>
        </>
    );
};

export default TeacherDetails;