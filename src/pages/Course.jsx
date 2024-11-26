import "./Course.css"
import {useState,useEffect} from "react";
import axios from "axios";
// import NavBar from "../Components/Dashboard/NavBar.jsx";
export default function Course(){

    const [lecturers, setLecturers] = useState([])
    const [courses, setCourses] = useState([])
    const [chosenLecturer, setChosenLecturer] = useState("")
    const [courseName,setCourseName] = useState("")
    const [description, setDescription] = useState("")
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
        console.log("try1111111111" + chosenLecturer)
        const temp = lecturers.filter(lecturer =>{return lecturer.name===chosenLecturer});
        console.log(temp[0])
        return temp[0].id;
    }


    function courseComponent(lecturer, course, description){
        return (
            <>
                <text>
                    Lecturer: <text>{lecturer}</text>
                    Course: <text>{course}</text>
                    Description: <text>{description}</text>
                </text>
            </>
        )
    }

    useEffect(() => {
        getLecturers();
        getAllCourses();
    }, []);


    return(
        <div>

            <div className={"courses-container"}>
                {
                 courses.map((course,index)=>{
                     return (
                         <div key={index}>
                             {
                                 courseComponent(course.lecturerEntity.name, course.name, course.description)
                             }
                         </div>
                     )
                 })
                }
            </div>

            <div className={"AddCourse"}>
                <h1>Add Course</h1>
                <input className={"Input"} type={"text"} value={courseName} onChange={(event) => setCourseName(event.target.value)}/>
                <input className={"Input"} type={"text"} value={description} onChange={(event) => setDescription(event.target.value)}/>
                <select className={"Input"} value={chosenLecturer} onChange={(event) => setChosenLecturer(event.target.value)}>
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
    )
}