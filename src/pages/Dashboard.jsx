import "./Dashboard.css";
import LastActivity from "../Components/Dashboard/LastActivities.jsx";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import NotificationPanel from "../Components/Dashboard/NotificationPanel.jsx";
import {Box, Stack} from "@mui/material";

function Dashboard() {

    return (
        <>
            <div className={"dashboard"}>
                <div className={"upper-container"}>
                    <div className={"search"}>
                        <h1>Search the knowledge base</h1>
                        <div className={"search-bar-container"}>
                            <input className={"search-input"} type="search" placeholder="Search"/>
                            <button className="search-button" type="submit" onClick={() => {freeSearch()}}>
                                <SearchRoundedIcon fontSize={"large"}/>
                            </button>
                        </div>
                    </div>
                </div>
                <Stack   margin={2} spacing={4} sx={{ m:4 }}>
                    <Box maxWidth={"60%"} minWidth={"60%"} alignSelf={"center"}>
                        <NotificationPanel/>
                    </Box>
                    <Box maxWidth={"60%"} minWidth={"60%"} alignSelf={"center"}>
                        <LastActivity/>
                    </Box>
                </Stack>
            </div>
        </>
    );
}

function freeSearch(){

}
export default Dashboard;