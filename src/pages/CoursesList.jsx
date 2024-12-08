import "./Course.css"
import "./NewForm.css"
import {useState,useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Pagination} from "@mui/material";

export default function CoursesList(){
    const navigate = useNavigate();
    const [lecturers, setLecturers] = useState([])
    const [courses, setCourses] = useState([])
    const [chosenLecturer, setChosenLecturer] = useState("")
    const [courseName,setCourseName] = useState("")
    // const [currentCourse, setCurrentCourse] = useState({name:"",id:""})
    const [description, setDescription] = useState("")
    // const [goToCourse, setGoToCourse] = useState(false)
    const SERVER_URL = "http://localhost:8080"
    const [newCourseVisibility, setNewCourseVisibility] = useState(false)

    function getLecturers(){
        axios.get(SERVER_URL+"/get-lecturers")
            .then(response => {
                if (response.data!=null){
                    setLecturers(response.data)
                }
            })
    }

    function getAllCourses(){
        axios.get(SERVER_URL+"/get-all-courses")
            .then(response=>{
                console.log(response.data)
                if(response.data!=null){
                    setCourses(response.data);
                    console.log(courses);
                }
            })
    }
    function addCourse(){
        axios.get(SERVER_URL+"/add-course?name="+ courseName + "&description=" + description + "&lecturer=" + getLecturerId()).then(
            response => {
                getAllCourses();
                setCourseName("");
                setDescription("");
                setChosenLecturer("");
            }
        )

    }

    function getLecturerId(){
        const temp = lecturers.filter(lecturer =>{return lecturer.name===chosenLecturer});
        return temp[0].id;
    }


    function handleNewCourseVisibility(){
        setNewCourseVisibility(!newCourseVisibility)
    }
    function courseComponent(index, lecturer, course, description,courseId){
        return (
            <div id={index}>
                <div className={"course-card"} onClick={() => navigate("/course/" + courseId)}>
                    <div className="course-card-content-image">
                        <img style={{width: "100%", height: "100%"}} src={"src/assets/course-image-placeholder.png"}
                             alt={"course image"}/>
                    </div>
                    <div className="course-card-content-text">
                        <text style={{
                            color: "darkgrey",
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            height:"15%"
                        }}>{course} • {lecturer}</text>
                        <text style={{color: "black", fontSize: "1.3rem", fontWeight: "bold", height:"85%"}}>{description}</text>
                    </div>
                </div>
            </div>
        )
    }

    useEffect(() => {
        getLecturers();
        getAllCourses();

    }, []);

    function addNewCourseComponent() {
        return (
            <div className={`add-new-form`} aria-expanded={newCourseVisibility}
                 style={newCourseVisibility ? {transform: "scale(1)"} : {transform: "scale(0)"}}>
                {/*<div className={"right-side"} style={{width: "60%"}}>*/}
                <div className="new-course-image">
                    <img style={{width: "100%", height: "100%"}} src={"src/assets/course-image-placeholder.png"}
                         alt={"course image"}/>
                </div>
                {/*<h1>New Course</h1>*/}
                <input className={"new-course-input"} type={"text"} value={courseName}
                       onChange={(event) => setCourseName(event.target.value)} placeholder={"Course Name"}/>
                <textarea className={"new-course-input-desc"} type={"text"} value={description}
                          onChange={(event) => setDescription(event.target.value)} placeholder={"Description"}/>
                <select className={"new-course-input-lecturer"} value={chosenLecturer}
                        onChange={(event) => setChosenLecturer(event.target.value)}>

                    <option value="" disabled>Select lecturer</option>

                    {
                        lecturers.map((lecturer, index) => {
                            return (
                                <option key={index} value={lecturer.name}>
                                    {lecturer.name}
                                </option>
                            );
                        })
                    }
                </select>
                <button className={"new-course-button"} onClick={() => {
                    addCourse()
                    setNewCourseVisibility(false)
                }}>Add Course
                </button>
            </div>
            // </div>
        )
    }

    return (
        <div className="courses-page">
            <div className={"upper-container"}>
                <text className={"course-page-header"}>Courses</text>
            </div>
            <div className={"course-card-container"}>
                {/*<Pagination count={10} variant={"outlined"} color={"secondary"}>*/}
                {newCourseVisibility && addNewCourseComponent()}

                {
                    courses.map((course, index) => {
                        return (
                            courseComponent(index, course.lecturerEntity.name, course.name, course.description, course.id)
                        )
                    })
                }

                {/*</Pagination>*/}

            </div>
            <div className="add-new-course-container">
                <button className={"add-new"}
                        onClick={() => handleNewCourseVisibility()}>+
                </button>
                {/*{addNewCourseComponent()}*/}
            </div>


        </div>
    )
}