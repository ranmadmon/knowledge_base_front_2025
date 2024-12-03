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
    const [material,setMaterial] = useState([]);
    const SERVER_URL = "http://localhost:8080/"

    // /get-materials-by-course-id

    function getMaterials(){
        axios.get(SERVER_URL+"get-materials-by-course-id?courseId="+courseID)
            .then(response => {
                if (response.data) {
                    setMaterial(response.data);
                }
            })
            .catch(error => {
                console.error("Error fetching materials:", error);
            });
    }

    useEffect(() => {
        const fetchData = async () => {
            setCourseData(await getCourse(courseID));
        }
        fetchData()
        getMaterials()
    }, []);
    return (
        <div>
            <h1>
                {courseData.name + "  " + courseData.description + "  by:" + courseData?.lecturerEntity?.name}
            </h1>
            <div>
                {
                    material.length > 0 && (
                        <div>
                            {
                                material.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <div>title: {item.title}</div>
                                            <div>description: {item.description}</div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    )
                }
            </div>

            <div>
                <button onClick={() => navigate("/courses-list")}>GO-BACK</button>
            </div>
        </div>
    )
}