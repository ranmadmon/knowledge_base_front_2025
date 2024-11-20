import NavBar from "../../../../OneDrive/שולחן העבודה/Computer Science/שנה ג\' סמסטר א/תכנות עם סיבות פיתוח חדשניות/knowledge_base_front-master/src/Components/NavBar.jsx";
import History from "../../../../OneDrive/שולחן העבודה/Computer Science/שנה ג\' סמסטר א/תכנות עם סיבות פיתוח חדשניות/knowledge_base_front-master/src/Components/History.jsx";
import CoursesList from "./CoursesList.jsx";

function Dashboard() {
    return (
        <>
            <div className={"dashboard"}>


            {NavBar()}
            {CoursesList()}
            {History()}
            </div>
        </>
    );
}

export default Dashboard;