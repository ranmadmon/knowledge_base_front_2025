import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import {Outlet, useNavigate} from "react-router-dom";
import Cookies from 'universal-cookie';

function NavBar() {
    const navigate = useNavigate();
    return (
        <>
            <nav className="navbar">
                <ul>
                    <li>
                        <img className={"Logo"} src={"src/assets/book-logo.png"} alt={"logo"}/></li>
                    <li>
                        <text className={"Title"}>Knowledge Base</text>
                    </li>
                    <li>
                        <text onClick={()=>navigate("/courses-list")}>Courses</text>
                    </li>
                    <li>
                        <text onClick={()=>navigate("/UpdateMatirials")}>Materials</text>
                    </li>

                    <li>
                        <input type="text" placeholder="search" className="search-bar"></input>
                    </li>
                    <li>
                        <button className="search-button" onClick={() => {}}>search</button>
                    </li>
                    {/*<logo className="logo">*/}
                    {/*    <img src="src/assets/logo.png" alt="logo"/>*/}
                    {/*</logo>*/}
                    <li>
                        <text onClick={
                            ()=>{
                                const cookies = new Cookies(null, { path: '/' });
                                cookies.remove("token");
                                navigate("/login");
                            }
                        }>Login <LoginRoundedIcon/></text>
                    </li>
                </ul>
            </nav>
            <Outlet/>
        </>
    );
}

export default NavBar;