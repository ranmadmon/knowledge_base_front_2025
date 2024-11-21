import {useState} from "react";
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
               if(response.data!=null){
                   setCourses(response.data);
                   console.log(courses);
               }
            })
    }

    function courseComponent(lecturer, course){
        return (
            <>
                <text>
                    Lecturer: <text>{lecturer}</text>
                    Course: <text>{course}</text>

                </text>
            </>
        )
    }

    

    return(
        <div>


            <div>
                <h1>Add Course</h1>
                <input type={"text"} value={courseName} onChange={(event) => setCourseName(event.target.value)}/>
                <input type={"text"} value={description} onChange={(event) => setDescription(event.target.value)}/>
                <select value={chosenLecturer} onChange={(event) => setChosenLecturer(event.target.value)}>
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