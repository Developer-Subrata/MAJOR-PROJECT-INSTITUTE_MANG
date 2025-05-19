import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { BottomNavigation, BottomNavigationAction, Paper, Table, TableBody, TableHead, Typography, Box } from '@mui/material';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import CustomBarChart from '../../components/CustomBarChart';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import { StyledTableCell, StyledTableRow } from '../../components/styles';


const StudentSubjects = () => {

    const dispatch = useDispatch();
    const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);
    const { userDetails, currentUser, loading } = useSelector((state) => state.user);

    const [subjectMarks, setSubjectMarks] = useState([]);
    const [selectedSection, setSelectedSection] = useState('table');

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id]);

    useEffect(() => {
        if (userDetails) {
            setSubjectMarks(userDetails.examResult || []);
        }
    }, [userDetails]);

    useEffect(() => {
        if (subjectMarks.length === 0) {
            dispatch(getSubjectList(currentUser.sclassName._id, "ClassSubjects"));
        }
    }, [subjectMarks, dispatch, currentUser.sclassName._id]);

    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };

    const WrapperBox = ({ children }) => (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '80vh',
                padding: 2,
            }}
        >
            <Box
                sx={{
                    border: '1px solid #ccc',
                    borderRadius: '20px',
                    padding: 5,
                    boxShadow: 5,
                    backgroundColor: '#fff',
                    width: '200%',
                    maxWidth: '600px',
                }}
            >
                {children}
            </Box>
        </Box>
    );

    const renderTableSection = () => (
        <WrapperBox>
            <Typography variant="h5" align="center" gutterBottom fontWeight="bold">
                Subject Marks
            </Typography>
            <Table>
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell><strong>Subject</strong></StyledTableCell>
                        <StyledTableCell><strong>Marks</strong></StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {subjectMarks.map((result, index) => {
                        if (!result.subName || !result.marksObtained) return null;
                        return (
                            <StyledTableRow key={index}>
                                <StyledTableCell>{result.subName.subName}</StyledTableCell>
                                <StyledTableCell>{result.marksObtained}</StyledTableCell>
                            </StyledTableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </WrapperBox>
    );

    const renderChartSection = () => (
        <WrapperBox>
            <Typography variant="h5" align="center" gutterBottom fontWeight="bold">
                Marks Chart
            </Typography>
            <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />
        </WrapperBox>
    );

    const renderClassDetailsSection = () => (
        <WrapperBox>
            <Typography variant="h5" align="center" gutterBottom fontWeight="bold">
                Class Details
            </Typography>
            <Typography variant="h6" gutterBottom fontWeight="bold">
                You are currently in Class: {sclassDetails && sclassDetails.sclassName}
            </Typography>
            <Typography variant="h6" gutterBottom fontWeight="bold">
                Subjects:
            </Typography>
            {subjectsList &&
                subjectsList.map((subject, index) => (
                    <Typography key={index} variant="body1" fontWeight="bold">
                        {subject.subName} ({subject.subCode})
                    </Typography>
                ))}
        </WrapperBox>
    );

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <Box sx={{ pb: 8 }}>
                    {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0 ? (
                        <>
                            {selectedSection === 'table' && renderTableSection()}
                            {selectedSection === 'chart' && renderChartSection()}

                            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                                <BottomNavigation
                                    value={selectedSection}
                                    onChange={handleSectionChange}
                                    showLabels
                                >
                                    <BottomNavigationAction
                                        label="Table"
                                        value="table"
                                        icon={
                                            selectedSection === 'table' ? (
                                                <TableChartIcon />
                                            ) : (
                                                <TableChartOutlinedIcon />
                                            )
                                        }
                                    />
                                    <BottomNavigationAction
                                        label="Chart"
                                        value="chart"
                                        icon={
                                            selectedSection === 'chart' ? (
                                                <InsertChartIcon />
                                            ) : (
                                                <InsertChartOutlinedIcon />
                                            )
                                        }
                                    />
                                </BottomNavigation>
                            </Paper>
                        </>
                    ) : (
                        renderClassDetailsSection()
                    )}
                </Box>
            )}
        </>
    );
};

export default StudentSubjects;