import "./Course.css"
import {useState, useEffect} from "react";
import axios from "axios";
import NavBar from "../Components/Dashboard/NavBar.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {getCourse} from "../API/CoursesAPI.jsx";

export default function Course() {
    const navigate = useNavigate();
    const location = useLocation();
    const [courseID, setCourseID] = useState(location.pathname.split("/")[2]);
    const [courseData, setCourseData] = useState({});



    useEffect(() => {
        const fetchData = async () => {
            setCourseData(await getCourse(courseID));
        }
        fetchData()
    }, []);
    return (
        <div>
            <h1>
                {courseData.name +"  "+courseData.description+"  by:" + courseData?.lecturerEntity?.name}
            </h1>
            <div>
                <button onClick={() => navigate("/courses-list")}>GO-BACK</button>
            </div>
        </div>
    )
}