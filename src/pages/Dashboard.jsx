import Courses from "../Components/Dashboard/Courses.jsx";
import "./Dashboard.css";
import LastMaterials from "../Components/Dashboard/LastMaterials.jsx";
import {useEffect} from "react";
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";

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
                <Courses/>
                <LastMaterials/>
            </div>
        </>
    );
}

export default Dashboard;