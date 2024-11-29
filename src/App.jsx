import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import CoursesList from "./pages/CoursesList.jsx";
import UploadMaterials from "./pages/UploadMaterials.jsx";
import Profile from "./pages/Profile.jsx";
import NavBar from "./Components/Dashboard/NavBar.jsx";

import "./App.css"
import Course from "./pages/Course.jsx";

function App() {
    return (
        <Router>
            <Routes>
                {/*<Route path='/' element={<Dashboard/>}/>*/}
                <Route path='/*' element={<ErrorPage/>}/>
                <Route path="/" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/courses-list" element={<CoursesList/>}/>

                <Route
                    element={
                        <NavBar/>
                    }

                    children={
                        <>
                            <Route path={'/dashboard'} element={<Dashboard/>}/>
                            <Route path="/CoursesList" element={<CoursesList/>}/>
                            <Route path="/matirals" element={<UploadMaterials/>}/>
                            <Route path="/profile" element={<Profile/>}/>
                        </>}/>
            </Routes>
        </Router>
    )
        ;
}



export default App;
