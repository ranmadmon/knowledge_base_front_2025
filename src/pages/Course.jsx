import {useState} from "react";
import axios from "axios";

export default function Course(){

    const [lecturers, setLecturers] = useState([])
    const [courses, setCourses] = useState([])
    const SERVER_URL = "http://localhost:3306"

    function getLecturers(){
        axios.get(SERVER_URL+"/get-lecturers")
            .then(response => {
                setLecturers(response.data)
            })
    }

    function getAllCourses(){
        axios.get(SERVER_URL+"/get-all-courses")
            .then(response=>{
                setCourses(response.data);
                console.log(courses);
            })
    }

    function course(lecturer, course){
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

        </div>
    )
}