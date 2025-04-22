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
    CircularProgress,
    TextField,
    Pagination,
} from "@mui/material";
import "../CssFiles/Dashboard.css";

const PlayersProgressDashboard = () => {
    const [playersProgress, setPlayersProgress] = useState([]);
    const [filteredPlayers, setFilteredPlayers] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    useEffect(() => {
        fetchPlayersProgress();
    }, []);

    useEffect(() => {
        const filtered = playersProgress.filter((player) =>
            player.username.toLowerCase().includes(filterText.toLowerCase())
        );
        setFilteredPlayers(filtered);
    }, [filterText, playersProgress]);

    const fetchPlayersProgress = async () => {
        try {
            const response = await axios.get("http://localhost:8080/get-all-players-progress");
            console.log("Fetched Data:", response.data);
            setPlayersProgress(response.data || []);
            setFilteredPlayers(response.data || []);
        } catch (error) {
            console.error("Error fetching players progress data:", error);
            setError("Failed to fetch players progress data. Check server connection.");
        } finally {
            setIsLoading(false);
        }
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    let currentRows = filteredPlayers.slice(indexOfFirstRow, indexOfLastRow);

    // הוספת שורות ריקות אם יש פחות מ-rowsPerPage
    while (currentRows.length < rowsPerPage) {
        currentRows.push({
            username: "",
            mathematicalLevel: "",
            verbalQuestionsLevel: "",
            variableLevel: "",
            successRateMath: "",
            successRateVerbal: "",
            successRateVariable: "",
        });
    }

    return (
        <Box className="dashboard-container" sx={{ minHeight: "350px", maxWidth: "900px", margin: "auto" }}>
            <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: "bold", textAlign: "center" }}>
                Players Progress
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
                <TextField
                    label="Filter by Username"
                    variant="outlined"
                    sx={{ width: "200px" }}
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    placeholder="Enter username..."
                />
            </Box>

            {isLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "250px" }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Alert severity="error" sx={{ marginBottom: 3 }}>
                    {error}
                </Alert>
            ) : (
                <TableContainer
                    component={Paper}
                    elevation={4}
                    className="table-container"
                    sx={{ mb: 2, pb: 2 }} // מוסיפים ריווח פנימי לתחתית כדי שהשורה האחרונה לא תיחתך
                >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "14px" }}>
                                    Username
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "14px" }}>
                                    Mathematical Level
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "14px" }}>
                                    Verbal Level
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "14px" }}>
                                    Variable Level
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "14px" }}>
                                    Math Success Rate (%)
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "14px" }}>
                                    Verbal Success Rate (%)
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "14px" }}>
                                    Variable Success Rate (%)
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentRows.map((player, index) => (
                                <TableRow
                                    key={index}
                                    sx={{
                                        "& > td": {
                                            borderBottom: "2px solid #ccc", // עובי קו תחתון
                                            padding: "12px",              // padding מוגבר לשורות עבות יותר
                                        },
                                        // אפשר גם להוסיף קצת margin בתחתית השורה האחרונה אם רוצים:
                                        "&:last-child td": {
                                            borderBottom: "2px solid #ccc",
                                            paddingBottom: "16px",
                                        },
                                    }}
                                >
                                    <TableCell align="center">{player.username || "-"}</TableCell>
                                    <TableCell align="center">{player.mathematicalLevel || "-"}</TableCell>
                                    <TableCell align="center">{player.verbalQuestionsLevel || "-"}</TableCell>
                                    <TableCell align="center">{player.variableLevel || "-"}</TableCell>
                                    <TableCell align="center">
                                        {typeof player.successRateMath === "number"
                                            ? player.successRateMath.toFixed(2)
                                            : "-"}
                                    </TableCell>
                                    <TableCell align="center">
                                        {typeof player.successRateVerbal === "number"
                                            ? player.successRateVerbal.toFixed(2)
                                            : "-"}
                                    </TableCell>
                                    <TableCell align="center">
                                        {typeof player.successRateVariable === "number"
                                            ? player.successRateVariable.toFixed(2)
                                            : "-"}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {filteredPlayers.length > rowsPerPage && (
                <Box className="pagination-container" sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
                    <Pagination
                        count={Math.ceil(filteredPlayers.length / rowsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        size="small"
                    />
                </Box>
            )}
        </Box>
    );
};

export default PlayersProgressDashboard;
