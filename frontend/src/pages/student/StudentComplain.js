import { useEffect, useState } from 'react';
import {
    Box,
    CircularProgress,
    Stack,
    TextField,
    Typography,
    Paper,
} from '@mui/material';
import Popup from '../../components/Popup';
import { BlueButton } from '../../components/buttonStyles';
import { addStuff } from '../../redux/userRelated/userHandle';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

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

    const fields = { user, date, complaint, school };

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
                    flex: '1 1 auto',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    height: '80vh',
                    width: '100%',
                    backgroundColor: '#f5f5f5',
                    px: 2,
                    borderRadius: '30px'
                }}
            >
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <Paper
                        elevation={6}
                        sx={{
                            padding: 4,
                            maxWidth: 500,
                            width: '100%',
                            borderRadius: '20px', // <-- Rounded corners
                        }}
                    >
                        <Stack spacing={1} sx={{ mb: 3 }}>
                            <Typography variant="h4" align="center">Complain</Typography>
                        </Stack>
                        <form onSubmit={submitHandler}>
                            <Stack spacing={3}>
                                <TextField
                                    fullWidth
                                    label="Select Date"
                                    type="date"
                                    value={date}
                                    onChange={(event) => setDate(event.target.value)}
                                    required
                                    InputLabelProps={{ shrink: true }}
                                />
                                <TextField
                                    fullWidth
                                    label="Write your complain"
                                    variant="outlined"
                                    value={complaint}
                                    onChange={(event) => setComplaint(event.target.value)}
                                    required
                                    multiline
                                    maxRows={4}
                                />
                            </Stack>

                            <BlueButton
                                fullWidth
                                size="large"
                                sx={{
                                    mt: 3,
                                    borderRadius: '30px',
                                    textTransform: 'none',
                                    fontWeight: 'bold',
                                }}
                                variant="contained"
                                type="submit"
                                disabled={loader}
                            >
                                {loader ? <CircularProgress size={24} color="inherit" /> : "Add"}
                            </BlueButton>
                        </form>
                    </Paper>
                </motion.div>
            </Box>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default StudentComplain;
