import "./Dashboard.css";
import LastActivity from "../Components/Dashboard/LastActivities.jsx";
import {useEffect} from "react";
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import NotificationPanel from "../Components/Dashboard/NotificationPanel.jsx";

function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        const cookies = new Cookies(null, { path: '/dashbord' });
        const token = cookies.get("token");
        if (!token) {
            // navigate("/");
        }
    }, []);

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
                <div className={"lower-container"}>
                    <NotificationPanel/>
                    <LastActivity/>
                </div>
            </div>
        </>
    );
}

function freeSearch(){

}
export default Dashboard;