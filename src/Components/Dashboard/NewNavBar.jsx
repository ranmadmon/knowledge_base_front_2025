import "./NavBar.css"
import {useEffect, useState} from 'react';
import {Stack} from "@mui/material";
import {Outlet, useNavigate} from "react-router-dom";
import ClickOutside from "../../pages/ClickOutside.jsx";
import {COURSE_LIST_URL, DASHBOARD_URL, LOGIN_URL} from "../../Utils/Constants.jsx";
import Cookies from "universal-cookie";


function NewNavBar() {
    const navigate = useNavigate();
    const [homeClicked, setHomeClicked] = useState(false);
    const [courseClicked, setCourseClicked] = useState(false);
    const [dataVisible, setDataVisible] = useState(false);

    function handleDataVisible(){
        setDataVisible(!dataVisible);
    }
    useEffect(() => {
        document.querySelector(".navbar ul").setAttribute("data-visible", dataVisible.toString());
    }, [dataVisible]);




    return (
        <Stack spacing={15} width={"100%"}>
            <ClickOutside >
                <nav className="navbar">
                    <div className="navbar-logo-container">
                        <img className={"navbar-logo"} src={"src/assets/navbar/book-logo.PNG"} alt={"logo"}/>
                    </div>
                    <button className={"hamburger-button"}
                            onClick={() => {
                                handleDataVisible()
                            }}>
                        {/*{dataVisible ? <CloseIcon fontSize={"large"}/>  : <MenuRoundedIcon fontSize={"large"}/>}*/}
                        <svg data-visible={dataVisible} stroke="var(--color-scheme)" fill="none" className="hamburger" viewBox="-10 15 120 120"
                             width="80">
                            <path data-visible={dataVisible} className="line" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"
                                  d="m 20 40 h 60 a 1 1 0 0 1 0 20 h -60 a 1 1 0 0 1 0 -40 h 30 v 70">
                            </path>
                        </svg>
                    </button>
                    <ul id={"navbar-ul"} data-visible={dataVisible} tabIndex={1}>
                        <div className="right-buttons">
                            <li>
                                <button aria-expanded={homeClicked ? "true" : "false"}
                                        className={"navbar-button"} onClick={() => {
                                    navigate(DASHBOARD_URL)
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
                                        navigate(COURSE_LIST_URL)
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
                                    async () => {
                                        const cookies = new Cookies(null, {path: '/'});
                                        await cookies.remove("token")
                                        navigate(LOGIN_URL)
                                        window.location.reload()
                                        handleDataVisible()
                                    }
                                }>Logout
                                    {/*<LogoutRoundedIcon className={"logout"} fontSize={ document.querySelector(".navbar ul").getAttribute("data-visible")==="false"?"medium":"large"}/>*/}
                                </button>

                            </li>
                        </div>

                    </ul>

                </nav>
            </ClickOutside>
            <Outlet/>
        </Stack>
    );
}

export default NewNavBar;