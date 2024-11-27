import ListCard from "./ListCard.jsx";
 import React, {useEffect, useState} from "react";
 import {getCourses} from "../../API/CoursesAPI.jsx";
function Courses() {
    const coursesList = [
        {
            id: 1,
            name: "Web Development Bootcamp",
            description: "Learn the fundamentals of web development, including HTML, CSS, and JavaScript."
        },
        {
            id: 2,
            name: "Data Science with Python",
            description: "Master data analysis, machine learning, and data visualization with Python."
        },
        {
            id: 3,
            name: "React.js for Frontend Development",
            description: "Build dynamic and interactive user interfaces with React.js."
        },
        {
            id: 4,
            name: "Node.js and Express.js for Backend Development",
            description: "Build scalable and efficient backend applications with Node.js and Express.js."
        },
        {
            id: 5,
            name: "Mobile App Development with Flutter",
            description: "Create beautiful and performant mobile apps for iOS and Android using Flutter."
        },
        {
            id: 6,
            name: "Cybersecurity Fundamentals",
            description: "Learn the basics of cybersecurity, including network security, ethical hacking, and digital forensics."
        },
        {
            id: 7,
            name: "Cybersecurity Fundamentals122ds2",
            description: "Learn the y, ethical hacking, and digital forensics."
        }
    ];

    const[courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState(coursesList);
    const [searchTerm, setSearchTerm] = useState("");
    const[loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try{
                const data = await getCourses();
                setCourses(data);
                setFilteredCourses(data);
            } catch (error){
                console.log(error);
                setError("Failed loading courses.")
            }finally {
                setLoading(false)
            }
        };
        fetchCourses();
    }, []);

    useEffect(() => {
        const filtered = courses.filter((course) =>
            course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCourses(filtered);
    }, [searchTerm,courses]);

    function renderCourseList(coursesList) {
       return (
          <ul>
              {coursesList.map((course)=> (
                  <li key = {course.id}>
                      <h3>{course.id} - {course.name}</h3>
                      <p>{course.description}</p>
                  </li>
              ))}
          </ul>
       )
    }

    if (loading) return <p>Loading courses...</p>
    if (error) return <p>{error}</p>

    return (
        <>

            {/*<input type="text" placeholder="Search courses" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>*/}
            <ListCard render={renderCourseList} list={filteredCourses} header={"CoursesList List"} />
        </>
    );
}

export default Courses;