import CoursesList from "./CoursesList.jsx";
import NavBar from "./NavBar.jsx";
import History from "./History.jsx";

function Dashboard() {
    return (
        <>
            <div className={"dashboard"}>


                <NavBar/>
                <CoursesList/>
                <History/>
            </div>
        </>
    );
}

export default Dashboard;