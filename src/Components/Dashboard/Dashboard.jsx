import "../CssFiles/Dashboard.css";
import LastActivity from "./LastActivities.jsx";
import {Box, Stack} from "@mui/material";
import Search from "../Navbar/Search.jsx";
import {COURSE_URL} from "../../Utils/Constants.jsx";
import {useNavigate} from "react-router-dom";
import NotificationCard from "./NotifictionCard/NotificationCard.jsx";

function Dashboard() {
    const navigate = useNavigate();
    const handleCourseSelect = (course) => {navigate(COURSE_URL + course.id);};

    return (
        <div className={"dashboard"}>
            <Search onSelect={handleCourseSelect} />
            <Stack minWidth={"100%"}  margin={2} spacing={4} sx={{ m:4 }}>
                <Box maxWidth={"60%"} minWidth={"60%"} alignSelf={"center"}>
                    <NotificationCard/>
                </Box>
                <Box maxWidth={"60%"} minWidth={"60%"} alignSelf={"center"}>
                    <LastActivity/>
                </Box>
            </Stack>
        </div>
    );
}

export default Dashboard;
