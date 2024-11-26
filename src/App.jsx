import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Course from "../src/pages/Course.jsx";
import UploadMaterials from "./pages/UploadMaterials.jsx";
import Profile from "./pages/Profile.jsx";
import NavBar from "./Components/Dashboard/NavBar.jsx";

import "./App.css"

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/*' element={<ErrorPage/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>


                <Route
                    element={
                        <NavBar/>
                    }

                    children={
                        <>
                            <Route path={'/'} element={<Dashboard/>}/>
                            <Route path="/Course" element={<Course/>}/>
                            <Route path="/matirals" element={<UploadMaterials/>}/>
                            <Route path="/profile" element={<Profile/>}/>
                        </>}/>
            </Routes>


            {/*        <h1>Knowledge Base</h1>
           <div>
                <Link to="/" style={{
                    marginRight: 50
                }}>To Page 1</Link>
                <Link to="/page2" style={{
                    marginRight: 50
                }}>To Page 2</Link>
                <Link to="/login" style={{
                    marginRight: 50
                }}>Login Page</Link>
            </div>*/
            }

        </Router>
    )
        ;
}



export default App;
