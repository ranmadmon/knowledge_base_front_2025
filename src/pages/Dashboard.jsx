import LastMaterials from "./LastMaterials.jsx";
import NavBar from "../Components/Dashboard/NavBar.jsx";
import History from "../Components/Dashboard/History.jsx";
import ListCard from "../Components/Dashboard/ListCard.jsx";
import Courses from "./Courses.jsx";

function Dashboard() {
    return (
        <>
            <div className={"dashboard"}>
                <NavBar/>
                <Courses/>
                {/*<ListCard/>*/}
            </div>
        </>
    );
}

export default Dashboard;