import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import CoursesList from "./pages/CoursesList.jsx";
import UploadMaterials from "./pages/UploadMaterials.jsx";
import Profile from "./pages/Profile.jsx";
import NavBar from "./Components/Dashboard/NavBar.jsx";
import "./App.css"
import MaterialList from "./pages/MaterialList.jsx";
import Cookies from "universal-cookie";
import {
    COURSE_LIST_URL,
    COURSE_URL,
    DASHBOARD_URL,
    LOGIN_URL,
    MATERIALS_URL,
    PROFILE_URL,
    REGISTER_URL
} from "./Utils/Constants.jsx";


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
                                }
                                children={
                                    <>
                                        <Route path={DASHBOARD_URL} element={<Dashboard/>}/>
                                        <Route path={COURSE_LIST_URL} element={<CoursesList/>}/>
                                        <Route path={MATERIALS_URL} element={<UploadMaterials/>}/>
                                        <Route path={PROFILE_URL} element={<Profile/>}/>
                                        <Route path={COURSE_URL+":id"} element={<MaterialList/>}/>
                                        {/*<Route path={"/codeInputComponent"} element={<OtpComponent/>}/>*/}

                                    </>}/>
                        </>
                    )
                    }
                    <Route path='/*' element={<ErrorPage/>}/>


                </Routes>
            </Router>

    );
}


export default App;
