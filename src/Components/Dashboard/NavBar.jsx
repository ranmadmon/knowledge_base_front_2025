import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import {Outlet, useNavigate} from "react-router-dom";
import Cookies from 'universal-cookie';
import "../../pages/NavBar.css"
import React from "react";
function NavBar() {
    const navigate = useNavigate();
    return (
        <>
            <nav className="navbar">
                <ul>
                    <li>
                        <img className={"Logo"} src={"src/assets/book-logo.png"} alt={"logo"} onClick={()=>navigate("/")} />
                    </li>
                    <li>
                        <text onClick={()=>navigate("/")} className={"Title"}>Knowledge Base</text>
                    </li>
                    <li>
                        <text className={"navbar-button"} onClick={()=>navigate("/courses-list")}>Courses</text>
                    </li>
                    <li className={"navbar-button"}>
                            <text  onClick={
                                () => {
                                    const cookies = new Cookies(null, {path: '/login'});
                                    cookies.remove("token");
                                    navigate("/");
                                }
                            }>Logout
                            </text>
                            <LogoutRoundedIcon/>

                    </li>
                </ul>
            </nav>
            <Outlet/>
        </>
    );
}

export default NavBar;