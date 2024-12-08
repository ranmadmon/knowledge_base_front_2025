import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseIcon from '@mui/icons-material/Close';
import {Outlet, useNavigate} from "react-router-dom";
import Cookies from 'universal-cookie';
import "./NavBar.css"
import React, {useEffect} from "react";



function NavBar() {
    const navigate = useNavigate();
    const [dataVisible, setDataVisible] = React.useState(false);
    const [homeClicked, setHomeClicked] = React.useState(false);
    const [courseClicked, setCourseClicked] = React.useState(false);
    function handleDataVisible(){
        setDataVisible(!dataVisible);
    }
    useEffect(() => {
        document.querySelector(".navbar ul").setAttribute("data-visible", dataVisible.toString());
    }, [dataVisible]);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-logo-container">
                    <img className={"navbar-logo"} src={"src/assets/navbar/book-logo.PNG"} alt={"logo"}/>
                </div>
                <button className={"hamburger-button"}
                        onClick={() => {
                            handleDataVisible()
                        }}>
                    {/*{dataVisible ? <CloseIcon fontSize={"large"}/>  : <MenuRoundedIcon fontSize={"large"}/>}*/}
                    <svg data-visible={dataVisible} stroke="white" fill="none" className="hamburger" viewBox="-10 15 120 120"
                         width="80">
                        <path data-visible={dataVisible} className="line" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"
                              d="m 20 40 h 60 a 1 1 0 0 1 0 20 h -60 a 1 1 0 0 1 0 -40 h 30 v 70">
                        </path>
                    </svg>
                </button>
                <ul data-visible={dataVisible} tabIndex={1}>
                    <div className="right-buttons">
                        <li>
                            <button aria-expanded={homeClicked ? "true" : "false"}
                                    className={"navbar-button"} onClick={() => {
                                navigate("/dashboard")
                                handleDataVisible()
                                setHomeClicked(true);
                                setCourseClicked(false);
                            }
                            }>Home
                            </button>
                        </li>
                        <li>
                            <button
                                aria-expanded={courseClicked ? "true" : "false"}
                                className={"navbar-button"}
                                    onClick={() => {
                                        navigate("/courses-list")
                                        handleDataVisible()
                                        setCourseClicked(true);
                                        setHomeClicked(false);
                                    }
                                    }>Courses
                            </button>
                        </li>
                    </div>
                    <div className={"left-buttons"}>
                        <li>
                            <button className={"navbar-button"} onClick={
                                () => {
                                    const cookies = new Cookies(null, {path: '/'});
                                    cookies.remove("token");
                                    navigate("/");
                                    handleDataVisible()
                                }
                            }>Logout
                                {/*<LogoutRoundedIcon className={"logout"} fontSize={ document.querySelector(".navbar ul").getAttribute("data-visible")==="false"?"medium":"large"}/>*/}
                            </button>

                        </li>
                    </div>

                </ul>
            </nav>
            <Outlet/>
        </>
    );
}

export default NavBar;