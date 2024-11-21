import "./Course.css"
import {useState,useEffect} from "react";
import axios from "axios";

export default function Course(){

    const [lecturers, setLecturers] = useState([])
    const [courses, setCourses] = useState([])
    const [chosenLecturer, setChosenLecturer] = useState("")
    const [courseName,setCourseName] = useState("")
    const [description, setDescription] = useState("")
    const SERVER_URL = "http://localhost:3306"

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
                console.log(response)
                if(response.data!=null){
                    setCourses(response.data);
                    console.log(courses);
                }
            })
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

    

    return(
        <div>

            <div>
                {
                 courses.map((course,index)=>{
                     return (
                         <div key={index}>
                             {
                                 courseComponent(course.lecturer.name, course.name, course.description)
                             }
                         </div>
                     )
                 })
                }            </div>

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

            </div>
        </div>
    )
}