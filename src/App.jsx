import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from "./Components/Login&Registration/Login.jsx";
import Register from "./Components/Login&Registration/Register.jsx";
import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import ErrorPage from "./Components/ErrorPages/ErrorPage.jsx";
import CoursesList from "./Components/Courses/CoursesList.jsx";
import "./Components/CssFiles/App.css"
import MaterialList from "./Components/Material/MaterialList.jsx";

import Cookies from "universal-cookie";
import {
    COURSE_LIST_URL,
    COURSE_URL,
    DASHBOARD_URL,
    LOGIN_URL,
    MATERIAL_PAGE_URL,
    REGISTER_URL
} from "./Utils/Constants.jsx";
import MaterialPage from "./Components/Material/MaterialPage.jsx";
import NavBar from "./Components/Navbar/NavBar.jsx";


function App() {
    const cookies = new Cookies(null, {path: '/'});
    const token = cookies.get("token");

    return (
            <Router>
                <Routes>
                    {token === undefined && (
                        <>
                            <Route path={LOGIN_URL} element={<Login/>}/>
                            <Route path={REGISTER_URL} element={<Register/>}
                            />
                        </>
                    )
                    }
                    {token !== undefined && (
                        <>
                            <Route
                                element={
                                    <NavBar/>
                                }>
                                <Route path={DASHBOARD_URL} element={<Dashboard/>}/>
                                <Route path={COURSE_LIST_URL} element={<CoursesList/>}/>
                                <Route path={COURSE_URL + ":id"} element={<MaterialList/>}/>
                                <Route path={COURSE_URL + ":id" + MATERIAL_PAGE_URL + ":id"} element={<MaterialPage/>}/>
                            </Route>
                        </>
                    )
                    }
                    <Route path='/*' element={<ErrorPage/>}/>


                </Routes>
            </Router>

    );
}


export default App;
