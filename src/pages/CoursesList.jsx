import "./Course.css"
import {useState,useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function CoursesList(){
    const navigate = useNavigate();
    const [lecturers, setLecturers] = useState([])
    const [courses, setCourses] = useState([])
    const [chosenLecturer, setChosenLecturer] = useState("")
    const [courseName,setCourseName] = useState("")
    const [currentCourse, setCurrentCourse] = useState({name:"",id:""})
    const [description, setDescription] = useState("")
    const [goToCourse, setGoToCourse] = useState(false)
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
        console.log("try" + lecturers)
        axios.get(SERVER_URL+"/add-course?name="+ courseName + "&description=" + description + "&lecturer=" + getLecturerId()).then(
            response => {
                getAllCourses();
                // איפוס שדות הטופס
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



    function courseComponent(lecturer, course, description,courseId){
        return (

            <div className={"course-card"} onClick={()=>navigate("/course/"+courseId)}>
                <div className="course-card-content-image">
                    <img style={{width:"100%", height:"100%"}} src={"src/assets/course-image-placeholder.png"} alt={"course image"} />
                </div>
                <div className="course-card-content-text">
                    <text style={{color: "darkgrey", fontSize: "1.2rem", fontWeight: "bold"}}>{course} • {lecturer}</text>
                    <text style={{color: "black", fontSize: "1.3rem", fontWeight: "bold"}}>{description}</text>
                </div>

            </div>
        )
    }

    useEffect(() => {
        getLecturers();
        getAllCourses();
    }, []);

    function addCourseComponent(){
        return(
            <div className={newCourseVisibility ? "add-new-course-form" : "close-animation"}>
                <h1>Add New Course</h1>
                <input className={"new-course-input"} type={"text"} value={courseName}
                       onChange={(event) => setCourseName(event.target.value)}/>
                <input className={"new-course-input"} type={"text"} value={description}
                       onChange={(event) => setDescription(event.target.value)}/>
                <select className={"new-course-input"} value={chosenLecturer}
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
                <button className={"new-course-button"} onClick={() => addCourse()}>Add Course</button>
            </div>
        )
    }
    return (
        <div className="courses-page">
            <text className={"course-page-header"}>Courses</text>
            <div className={"course-card-container"}>
                {
                    courses.map((course) => {
                        return (
                            courseComponent(course.lecturerEntity.name, course.name, course.description, course.id)
                        )
                    })
                }
            </div>

            <div className="add-new-course-container">
                <button className={"add-new-course"}
                        onClick=
                            {() =>
                                setNewCourseVisibility(!newCourseVisibility)
                            }
                >+</button>
                {newCourseVisibility && addCourseComponent()}
                {/*{addCourseComponent()}*/}
            </div>


        </div>
    )
}