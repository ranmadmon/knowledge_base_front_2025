import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Alert,
    Pagination,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import Cookies from "universal-cookie";
import "../CssFiles/Dashboard.css";

const DashBoard = () => {
    const [questionsHistory, setQuestionsHistory] = useState([]);
    const [originalQuestionsHistory, setOriginalQuestionsHistory] = useState([]);
    const [progressData, setProgressData] = useState(null);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // פילטרים
    const [filterCorrect, setFilterCorrect] = useState("");
    const [filterLevel, setFilterLevel] = useState("");
    const [filterType, setFilterType] = useState("");

    // מודאל (חלונית) להצגת השאלה המלאה
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const questionsPerPage = 4;
    const cookies = new Cookies();
    const token = cookies.get("token");

    useEffect(() => {
        fetchQuestionsHistory();
        fetchProgressData();
    }, []);

    const fetchQuestionsHistory = async () => {
        try {
            const response = await axios.get("http://localhost:8080/get-questions-history", {
                params: { token: token },
            });
            const data = response.data || [];
            setQuestionsHistory(data);
            setOriginalQuestionsHistory(data);
        } catch (error) {
            setError("Failed to fetch questions history. Check server connection.");
        }
    };

    const fetchProgressData = async () => {
        try {
            const response = await axios.get("http://localhost:8080/get-progress-data", {
                params: { token: token },
            });
            setProgressData(response.data || {});
        } catch (error) {
            setError("Failed to fetch progress data. Check server connection.");
        }
    };

    const handleFilter = () => {
        let filteredQuestions = originalQuestionsHistory;

        if (filterCorrect) {
            filteredQuestions = filteredQuestions.filter((q) => q.correct === filterCorrect);
        }

        if (filterLevel) {
            filteredQuestions = filteredQuestions.filter(
                (q) => q.difficultyLevel === parseInt(filterLevel)
            );
        }

        if (filterType) {
            filteredQuestions = filteredQuestions.filter(
                (q) => q.type === parseInt(filterType)
            );
        }

        setQuestionsHistory(filteredQuestions);
        setCurrentPage(1);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    // פתיחת מודאל להצגת השאלה המלאה
    const openModal = (question) => {
        setSelectedQuestion(question);
    };

    // סגירת המודאל
    const closeModal = () => {
        setSelectedQuestion(null);
    };

    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    let currentQuestions = questionsHistory.slice(indexOfFirstQuestion, indexOfLastQuestion);

    // הוספת שורות ריקות אם יש פחות מ-4 שאלות בדף (לשמירת גובה טבלה אחיד)
    while (currentQuestions.length < questionsPerPage) {
        currentQuestions.push({ id: `empty-${currentQuestions.length}`, isEmpty: true });
    }

    return (
        <Box className="dashboard-wrapper">
            <Box className="dashboard-container">
                <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: "bold", textAlign: "center" }}>
                    Questions History
                </Typography>

                {error && <Alert severity="error">{error}</Alert>}

                <Box className="filters-container">
                    <FormControl sx={{ minWidth: 120, flex: 1 }}>
                        <InputLabel shrink sx={{ position: "absolute", background: "white", px: 0.5 }}>
                            IsCorrect
                        </InputLabel>
                        <Select value={filterCorrect} onChange={(e) => setFilterCorrect(e.target.value)}>
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="Correct">Correct</MenuItem>
                            <MenuItem value="Wrong">Wrong</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl sx={{ minWidth: 120, flex: 1 }}>
                        <InputLabel shrink sx={{ position: "absolute", background: "white", px: 0.5 }}>
                            Exercise Type
                        </InputLabel>
                        <Select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="1">Mathematics</MenuItem>
                            <MenuItem value="2">Verbal</MenuItem>
                            <MenuItem value="3">Variable</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        label="Difficulty Level"
                        type="number"
                        value={filterLevel}
                        onChange={(e) => setFilterLevel(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ inputProps: { min: 1 } }}
                        sx={{ flex: 1 }}
                    />

                    <Button variant="contained" color="primary" onClick={handleFilter} sx={{ flex: 1 }}>
                        Apply Filters
                    </Button>
                </Box>

                <TableContainer component={Paper} className="table-container">
                    <Table sx={{ tableLayout: "fixed", width: "100%" }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center"><strong>Exercise Type</strong></TableCell>
                                <TableCell align="center"><strong>Question</strong></TableCell>
                                <TableCell align="center"><strong>IsCorrect</strong></TableCell>
                                <TableCell align="center"><strong>Difficulty Level</strong></TableCell>
                                <TableCell align="center"><strong>Date</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentQuestions.map((question, index) => (
                                <TableRow key={index} style={question.isEmpty ? { height: "50px" } : {}}>
                                    <TableCell align="center">
                                        {question.isEmpty
                                            ? ""
                                            : question.type === 1
                                                ? "Mathematics"
                                                : question.type === 2
                                                    ? "Verbal"
                                                    : question.type === 3
                                                        ? "Variable"
                                                        : ""}
                                    </TableCell>
                                    <TableCell align="center">
                                        {!question.isEmpty && (
                                            <span className="truncated-text" onClick={() => openModal(question)}>
                                                {question.text}
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell align="center" className={question.correct}>
                                        {question.isEmpty ? "" : question.correct}
                                    </TableCell>
                                    <TableCell align="center">
                                        {question.isEmpty ? "" : question.difficultyLevel}
                                    </TableCell>
                                    <TableCell align="center">
                                        {question.isEmpty ? "" : new Date(question.timeStamp).toLocaleString()}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Pagination
                    count={Math.ceil(questionsHistory.length / questionsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                />
            </Box>

            <Dialog
                open={Boolean(selectedQuestion)}
                onClose={closeModal}
                fullWidth
                maxWidth="lg" // ניתן לשנות ל-"md" או "xl" לפי הצורך
            >
                <DialogTitle>Exercise Details</DialogTitle>
                <DialogContent
                    dividers
                    sx={{
                        maxHeight: "20vh", // גובה מקסימלי, כך שאם הטקסט ארוך מדי, יופיע Scroll
                        overflowY: "auto",
                    }}
                >
                    <Typography variant="body1">
                        {selectedQuestion?.text}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal} variant="outlined" color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>


            <Box className="progress-container">
                <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: "bold", textAlign: "center" }}>
                    Progress Overview
                </Typography>
                {progressData ? (
                    <Box className="progress-container">
                        <Typography variant="body1">
                            <strong>Mathematical Level:</strong> {progressData.mathLevel}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Mathematical Success Rate:</strong> {progressData.mathSuccessRate?.toFixed(2)}%
                        </Typography>
                        <Typography variant="body1">
                            <strong>Total Correct Math Answers:</strong> {progressData.totalCorrectMathAnswers}
                        </Typography>
                        <Box sx={{ marginTop: 2, borderTop: "1px solid gray", paddingTop: 2 }}>
                            <Typography variant="body1">
                                <strong>Verbal Level:</strong> {progressData.verbalLevel}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Verbal Success Rate:</strong> {progressData.verbalSuccessRate?.toFixed(2)}%
                            </Typography>
                            <Typography variant="body1">
                                <strong>Total Correct Verbal Answers:</strong> {progressData.totalCorrectVerbalAnswers}
                            </Typography>
                        </Box>
                        <Box sx={{ marginTop: 2, borderTop: "1px solid gray", paddingTop: 2 }}>
                            <Typography variant="body1">
                                <strong>Variable Level:</strong> {progressData.variableLevel}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Variable Success Rate:</strong> {progressData.variableSuccessRate?.toFixed(2)}%
                            </Typography>
                            <Typography variant="body1">
                                <strong>Total Correct Variable Answers:</strong> {progressData.totalCorrectVariableAnswers}
                            </Typography>
                        </Box>
                    </Box>
                ) : (
                    <Typography variant="body1" sx={{ color: "gray" }}>
                        No progress data available yet.
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default DashBoard;
