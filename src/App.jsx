import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from "./Components/Login&Registration/Login.jsx";
import Register from "./Components/Login&Registration/Register.jsx";
import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import ErrorPage from "./Components/ErrorPages/ErrorPage.jsx";
import "./Components/CssFiles/App.css"

import Cookies from "universal-cookie";
import {
    DASHBOARD_URL,
    LOGIN_URL, MathematicalExercises_URL, PlayersProgressDashboard_URL,
    REGISTER_URL, UserDetails_URL
} from "./Utils/Constants.jsx";
import NavBar from "./Components/Navbar/NavBar.jsx";
// eslint-disable-next-line no-unused-vars
import MathematicalExercises from "./Components/Practice/MathematicalExercises.jsx";
import PlayersProgressDashboard from "./Components/Dashboard/PlayersProgressDashboard.jsx";
import UserDetails from "./Components/userDetalis/UserDetails.jsx";


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
                                <Route path={PlayersProgressDashboard_URL} element={<PlayersProgressDashboard/>}/>
                                <Route path={MathematicalExercises_URL} element={<MathematicalExercises/>}/>
                                <Route path={UserDetails_URL} element={<UserDetails/>}/>

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
