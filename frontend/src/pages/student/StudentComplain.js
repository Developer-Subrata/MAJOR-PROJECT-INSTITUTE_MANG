import { useEffect, useState } from 'react';
import { Box, CircularProgress, Stack, TextField, Typography, Paper } from '@mui/material';
import Popup from '../../components/Popup';
import { BlueButton } from '../../components/buttonStyles';
import { addStuff } from '../../redux/userRelated/userHandle';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const StudentComplain = () => {
    const [complaint, setComplaint] = useState("");
    const [date, setDate] = useState("");

    const dispatch = useDispatch();
    const { status, currentUser, error } = useSelector(state => state.user);

    const user = currentUser._id;
    const school = currentUser.school._id;
    const address = "Complain";

    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const fields = {
        user,
        date,
        complaint,
        school,
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        dispatch(addStuff(fields, address));
    };

    useEffect(() => {
        if (status === "added") {
            setLoader(false);
            setShowPopup(true);
            setMessage("Done Successfully");
        } else if (error) {
            setLoader(false);
            setShowPopup(true);
            setMessage("Network Error");
        }
    }, [status, error]);

    return (
        <>
            <Box
                sx={{
                    minHeight: '90vh',
                    backgroundColor: '#f8f9fa',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    px: 2,
                }}
            >
                <motion.div
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    style={{ width: '100%', maxWidth: 500 }}
                >
                    <Paper elevation={3}
                        sx={{
                            borderRadius: 4,
                            p: 5
                        }}
                    >
                        <Typography variant="h4" align="center" gutterBottom
                            sx={{
                                fontWeight: 'bold',
                                fontFamily: 'Georgia, serif',
                                mt: 0,      
                                mb: 2       
                            }}
                        >
                            COMPLAIN
                        </Typography>
                        <form onSubmit={submitHandler}>
                            <Stack spacing={3}>
                                <TextField
                                    fullWidth
                                    label="Select Date"
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                    InputLabelProps={{ shrink: true }}
                                />
                                <TextField
                                    fullWidth
                                    label="Write your complain"
                                    value={complaint}
                                    onChange={(e) => setComplaint(e.target.value)}
                                    required
                                    variant="outlined"
                                    multiline
                                    rows={3}
                                />
                                <BlueButton
                                    fullWidth
                                    size="large"
                                    variant="contained"
                                    type="submit"
                                    sx={{ borderRadius: 11, py: 1.5 }}
                                    disabled={loader}
                                >
                                    {loader ? <CircularProgress size={24} color="inherit" /> : "Add"}
                                </BlueButton>
                            </Stack>
                        </form>
                    </Paper>
                </motion.div>
            </Box>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default StudentComplain;