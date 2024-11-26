import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import RegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';

import {Outlet, useNavigate} from "react-router-dom";

function NavBar() {
    const navigate = useNavigate();

    return (
        <>
            <nav className="navbar">
                <ul>
                    <li><img className={"Logo"} src={"src/assets/book-logo.png"} alt={"logo"}/></li>
                    <li>
                        <text className={"Title"}>Knowledge Base</text>
                    </li>
                    <li><a href="/course">Courses</a></li>
                    <li><a href="/uptade-materials">Materials</a></li>

                    {/*<li><input type="text" placeholder="search" className="search-bar"></input>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <button className="search-button" onClick={() => {}}>search</button>*/}
                    {/*</li>*/}
                    <li><a href="/profile">Profile</a></li>
                    {/*<logo className="logo">*/}
                    {/*    <img src="src/assets/logo.png" alt="logo"/>*/}
                    {/*</logo>*/}
                    <li><a style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "5px",
                        textAlign: "center"
                    }} href="/login">Login <LoginRoundedIcon style={{fontSize: "28px", marginTop: "2px"}}/></a></li>
                    <li><a style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "5px",
                        textAlign: "center"
                    }} href="/register">Signup <RegistrationRoundedIcon
                        style={{fontSize: "28px", marginTop: "3px"}}/></a></li>
                </ul>
            </nav>
            <Outlet/>
        </>
    );
}

export default NavBar;