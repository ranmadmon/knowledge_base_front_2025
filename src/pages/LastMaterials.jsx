import {useState} from "react";

function LastMaterials() {
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(3)


    const courses = [
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


    function renderCoursesList() {
        const relevantCourses = courses.slice(currentPage * perPage - perPage, currentPage * perPage);
        return relevantCourses.map((course, index) => {
            return (
                <li key={index}>
                    {course.id} - {course.name} : {course.description}
                </li>
            );
        });
    }


    function nextPage() {
        if (!(currentPage * perPage >= courses.length)) {
            setCurrentPage(currentPage + 1)
        }
    }

    function previousPage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }


    return (
        <>
            <nav className="navCourses">
                <div>
                    <input type="text" placeholder="search" className="search-courses"/>
                </div>
                <ul>
                    {renderCoursesList()}
                </ul>
                <ul>
                    <div>
                        <button onClick={() => previousPage()} disabled={currentPage === 1}> previous page</button>
                        <button onClick={() => nextPage()} disabled={currentPage * perPage >= courses.length}> next
                            page
                        </button>
                    </div>

                </ul>
            </nav>
        </>
    );
}

export default LastMaterials;