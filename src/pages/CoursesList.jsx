import "./Course.css"
import {useState,useEffect} from "react";
import axios from "axios";
import NavBar from "../Components/Dashboard/NavBar.jsx";
import Course from "./Course.jsx";
export default function CoursesList(){

    const [lecturers, setLecturers] = useState([])
    const [courses, setCourses] = useState([])
    const [chosenLecturer, setChosenLecturer] = useState("")
    const [courseName,setCourseName] = useState("")
    const[currentCourse, setCurrentCourse] = useState({name:"",id:""})
    const [description, setDescription] = useState("")
    const [goToCourse, setGoToCourse] = useState(false)
    const SERVER_URL = "http://localhost:8080"

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
        axios.get(SERVER_URL+"/add-course?name="+ courseName + "&description=" + description + "&lecturer=" + getLecturerId())
    }

    function getLecturerId(){
        const temp = lecturers.filter(lecturer =>{return lecturer.name===chosenLecturer});
        return temp[0].id;
    }

    useEffect(()=>{
        getAllCourses();
    },[courses])

    function courseComponent(lecturer, course, description,courseId){
        return (
            //TODO רם תוכל בבקשה לעשות שהדיב יראה לחיץ? תודוש על הטודו
            <div onClick={()=>{setCurrentCourse({name:course,id:courseId});setGoToCourse(true)}} className="course-card-container">
                <text className={"course-card"}>
                    <h1>Course Name: {course}</h1>
                    <h2>Lecturer: {lecturer}</h2>
                    <h3>Description: {description}</h3>
                </text>
            </div>
        )
    }

    useEffect(() => {
        getLecturers();
        getAllCourses();
    }, []);

    return (
        <div>

           {
             goToCourse?<Course course={currentCourse} setGoToCourse={setGoToCourse}/>:
                 <div>
                     <NavBar/>
                     <div className={"course-list-container"}>
                         {
                             courses.map((course, index) => {
                                 return (
                                     <div key={index}>
                                         {
                                             courseComponent(course.lecturerEntity.name, course.name, course.description,index)
                                         }
                                     </div>
                                 )
                             })
                         }

                     </div>

                     <div className={"AddCourse"}>
                         <h1>Add Course</h1>
                         <input className={"Input"} type={"text"} value={courseName}
                                onChange={(event) => setCourseName(event.target.value)}/>
                         <input className={"Input"} type={"text"} value={description}
                                onChange={(event) => setDescription(event.target.value)}/>
                         <select className={"Input"} value={chosenLecturer}
                                 onChange={(event) => setChosenLecturer(event.target.value)}>
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
                         <button onClick={() => addCourse()}>Add Course</button>
                     </div>
                 </div>
           }
        </div>
    )
}