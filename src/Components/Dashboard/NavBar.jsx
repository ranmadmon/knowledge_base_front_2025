import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import {Outlet, useNavigate} from "react-router-dom";
import Cookies from 'universal-cookie';
import "./NavBar.css"
import React from "react";
function NavBar() {
    const navigate = useNavigate();
    return (
        <>
            <nav className="navbar">
                <ul>
                    <li>
                        <img className={"Logo"} src={"src/assets/book-logo.png"} alt={"logo"}
                             onClick={() => navigate("/dashboard")}/>
                    </li>
                    {/*<li>*/}
                    {/*    <text onClick={() => navigate("/")} className={"Title"}>Knowledge Base</text>*/}
                    {/*</li>*/}
                    <li>
                        <button tabIndex={"1"} className={"navbar-button"} onClick={() => navigate("/dashboard")}>Home</button>
                    </li>
                    <li>
                        <button tabIndex={"2"} className={"navbar-button"} onClick={() => navigate("/courses-list")}>Courses</button>
                    </li>
                    <li>
                        <button className={"navbar-button"} onClick={
                            () => {
                                const cookies = new Cookies(null, {path: '/'});
                                cookies.remove("token");
                                navigate("/");
                            }
                        }>Logout
                            <LogoutRoundedIcon/>
                        </button>

                    </li>
                </ul>
            </nav>
            <Outlet/>
        </>
    );
}

export default NavBar;