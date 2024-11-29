import Courses from "../Components/Dashboard/Courses.jsx";
import "./Dashboard.css";
import LastMaterials from "../Components/Dashboard/LastMaterials.jsx";
import {useEffect} from "react";
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        const cookies = new Cookies(null, { path: '/' });
        const token = cookies.get("token");
        if (!token) {
            navigate("/");
        }
    }, []);

    return (
        <>
            <div className={"dashboard"}>
                <div className={"upper-container"}>
                    <div className={"search"}>
                        <h1>Search the knowledge base</h1>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <input style={{width: "18vw"}} className={"form-input"} type="search" placeholder="Search"/>
                            <button style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "5px",
                                border: "none",
                                background: "transparent",
                                cursor: "pointer"
                            }} type="submit" onClick={() => {
                            }}>
                                <SearchRoundedIcon style={{width: "50px", height: "50px", color: "white"}}/>
                            </button>
                        </div>
                    </div>
                    {/*<img style={{width: "350px", height: "300px"}} src={"src/assets/orange.png"} alt="people"/>*/}

                </div>

                <Courses/>
                <LastMaterials/>
                {/*<History/>*/}
            </div>
        </>
    );
}

export default Dashboard;