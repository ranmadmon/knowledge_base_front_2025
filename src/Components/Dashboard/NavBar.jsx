import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import {Outlet, useNavigate} from "react-router-dom";
import Cookies from 'universal-cookie';
import "../../pages/NavBar.css"
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
                        <text className={"Title"}>Knowledge Base</text>
                    </li>
                    <li>
                        <text className={"navbar-button"} onClick={()=>navigate("/courses-list")}>Courses</text>
                    </li>

                    {/*<li className={"search-bar-container"}>*/}
                    {/*        <input type="text" placeholder="search" className="search-bar"></input>*/}
                    {/*        <SearchRoundedIcon className={"search-button"} style={{width:"30px", height:"30px"}} onClick={() => {}}/>*/}
                    {/*</li>*/}
                    <li className={"navbar-button"}>
                            <text  onClick={
                                () => {
                                    const cookies = new Cookies(null, {path: '/'});
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