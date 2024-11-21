import {useState} from "react";
import axios from "axios";

function CoursesList() {
    const [currentPage,setCurrentPage] = useState(1)
    const [perPage,setPerPage] = useState(3)
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

    const coursesTemp = [
        {

            name: "Web Development Bootcamp",
            description: "Learn the fundamentals of web development, including HTML, CSS, and JavaScript.",
            lecturer: "shai"
        },
        {

            name: "Data Science with Python",
            description: "Master data analysis, machine learning, and data visualization with Python.",
            lecturer: "aviya"
        },
        {

            name: "React.js for Frontend Development",
            description: "Build dynamic and interactive user interfaces with React.js.",
            lecturer: "boris"
        },
        {

            name: "Node.js and Express.js for Backend Development",
            description: "Build scalable and efficient backend applications with Node.js and Express.js.",
            lecturer: "effi"
        },
        {

            name: "Mobile App Development with Flutter",
            description: "Create beautiful and performant mobile apps for iOS and Android using Flutter.",
            lecturer: "shai"
        },
        {

            name: "Cybersecurity Fundamentals",
            description: "Learn the basics of cybersecurity, including network security, ethical hacking, and digital forensics.",
            lecturer: "menachem"
        },
        {

            name: "Cybersecurity Fundamentals122ds2",
            description: "Learn the y, ethical hacking, and digital forensics.",
            lecturer: "leshem"
        }
    ];

    function addCourse() {
        axios.get(SERVER_URL+"/login?username=" + username + "&password=" + password)
            .then(response => {
                if (response.data.success){
                    if (!response.data.loginSuccessful){
                        setErrorCode(response.data.errorCode)
                    }else{
                        navigate("/dashboard");
                    }
                }
            })
    }

    // function renderCoursesList() {
    //     const relevantCourses =  courses.slice(currentPage*perPage-perPage, currentPage*perPage);
    //     return relevantCourses.map((course, index) => {
    //         return (
    //             <li key={index}>
    //                 {course.id} -   {course.name} : <br/> {course.description}
    //             </li>
    //         );
    //     });
    // }


    function  nextPage() {
        if (!(currentPage * perPage >= courses.length)) {
            setCurrentPage(currentPage + 1)
        }
    }
    function previousPage(){
        if (currentPage!==1){
            setCurrentPage(currentPage-1)
        }
    }


    return (
        <>
            <nav className="navCourses">
                <div>
                    <input type="text" placeholder="search" className="search-courses"/>
                </div>
                <ul>

                </ul>
                <ul>
                    <button onClick={() => previousPage()} disabled={currentPage===1}> previous page</button>
                    <button onClick={() => nextPage()}  disabled={currentPage * perPage >= courses.length}> next page</button>
                </ul>
            </nav>
        </>
    );
}

export default CoursesList;