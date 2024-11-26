import Courses from "../Components/Dashboard/Courses.jsx";
import "./Dashboard.css";
import LastMaterials from "../Components/Dashboard/LastMaterials.jsx";

function Dashboard() {
    return (
        <>
            <div className={"dashboard"}>
                <Courses/>
                <LastMaterials/>
            </div>
        </>
    );
}

export default Dashboard;