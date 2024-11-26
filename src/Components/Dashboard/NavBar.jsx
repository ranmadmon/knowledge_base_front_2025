import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import {Outlet, useNavigate} from "react-router-dom";

function NavBar() {
    const navigate = useNavigate();

    return (
        <>
            <nav className="navbar">
                <ul>
                    <li>
                        <text className="logo"> KNOWLEDGE BASE</text>
                    </li>
                    <li>
                        <text onClick={() => navigate('/courses')}>Courses</text>
                    </li>
                    <li>
                        <text onClick={() => navigate('/materials')}>Update-materials</text>
                    </li>
                    <li><input type="text" placeholder="search" className="search-bar"></input>
                        <button className="search-button" onClick={() => {
                        }}>search
                        </button>
                    </li>
                    <li>
                        <text onClick={() => navigate('/Profile')}>Profile</text>
                    </li>

                    <li>
                        <text className="logout" onClick={() => navigate('/login')}>Logout {<LogoutRoundedIcon/>}</text>
                    </li>
                </ul>
            </nav>
            <Outlet/>
        </>
    );
}

export default NavBar;