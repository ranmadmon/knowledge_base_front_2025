import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
function NavBar() {

    return (
            <nav className="navbar">

                <ul>
                    <li><a href="/courses">Courses</a></li>
                    <li><a href="/uptade-materials">Update-materials</a></li>
                    <li><input type="text" placeholder="search" className="search-bar"></input>
                        <button className="search-button" onClick={() => {
                        }}>search
                        </button>
                    </li>
                    <li><a href="/profile">Profile</a></li>
                    <logo className="logo">
                        <img src="../../../../OneDrive/שולחן%20העבודה/Computer%20Science/שנה%20ג'%20סמסטר%20א/תכנות%20עם%20סיבות%20פיתוח%20חדשניות/knowledge_base_front-master/src/assets/logo.png" alt="logo"/>
                    </logo>
                    <li><a href="/logout">Logout <LogoutRoundedIcon/></a></li>
                </ul>
            </nav>
    );
}

export default NavBar;