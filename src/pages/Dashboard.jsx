// import CoursesList from "./CoursesList.jsx";
import NavBar from "../Components/Dashboard/NavBar.jsx";
// import History from "./History.jsx";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

function Dashboard() {
    function search(){

    }
    return (
        <>
            <div className={"dashboard"}>
                <div className={"upper-container"}>
                    <NavBar/>
                    <div className={"search"}>
                        <h1>Search the knowledge base</h1>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <input style={{width:"18vw"}} className={"form-input"} type="search" placeholder="Search"/>
                            <button style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "5px",
                                border: "none",
                                background: "transparent",
                                cursor: "pointer"
                            }} type="submit" onClick={search}>
                                <SearchRoundedIcon style={{width: "50px", height: "50px", color: "white"}}/>
                            </button>
                        </div>
                    </div>
                </div>

                {/*<CoursesList/>*/}
                {/*<History/>*/}
            </div>
        </>
    );
}

export default Dashboard;