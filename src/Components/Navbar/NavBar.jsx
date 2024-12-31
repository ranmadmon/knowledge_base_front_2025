import "../CssFiles/NavBar.css"
import {useEffect, useRef, useState} from 'react';
import {Box, IconButton, Stack} from "@mui/material";
import {Outlet, useNavigate} from "react-router-dom";
import ClickOutside from "./ClickOutside.jsx";
import {COURSE_LIST_URL, DASHBOARD_URL, LOGIN_URL} from "../../Utils/Constants.jsx";
import Cookies from "universal-cookie";
import ChatPage from "../Chat/ChatPage.jsx";
import ChatIcon from '@mui/icons-material/Chat';
import ChatOffIcon from '@mui/icons-material/SpeakerNotesOff';

function NavBar() {
    const navigate = useNavigate();
    const [homeClicked, setHomeClicked] = useState(false);
    const [courseClicked, setCourseClicked] = useState(false);
    const [dataVisible, setDataVisible] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const chatPageRef = useRef(null);

    function handleDataVisible() {
        setDataVisible(!dataVisible);
    }

    useEffect(() => {
        document.querySelector(".navbar ul").setAttribute("data-visible", dataVisible.toString());
    }, [dataVisible]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (chatPageRef.current && !chatPageRef.current.contains(event.target)) {
                setIsChatOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <Box>
            <Stack spacing={14} width={"100%"}>
                <ClickOutside>
                    <nav className="navbar">
                        <div className="navbar-logo-container">
                            <img className={"navbar-logo"} src={"src/assets/navbar/book-logo.PNG"} alt={"logo"}/>
                        </div>
                        <button className={"hamburger-button"}
                                onClick={() => {
                                    handleDataVisible()
                                }}>
                            <svg data-visible={dataVisible} stroke="var(--color-scheme)" fill="none"
                                 className="hamburger" viewBox="-10 15 120 120"
                                 width="80">
                                <path data-visible={dataVisible} className="line" strokeWidth="10" strokeLinecap="round"
                                      strokeLinejoin="round"
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
                                    </button>

                                </li>
                            </div>

                        </ul>

                    </nav>
                </ClickOutside>
                <Outlet/>
            </Stack>

            <IconButton
                sx={{
                    bgcolor:"white",
                    position: 'fixed',
                    bottom: '3%',
                    left: '2%',
                    zIndex: 1000,
                    transition: "all 0.3s ease-in-out",
                    color: "var(--color-scheme)",
                    border: "none",
                    boxShadow: "0 0 3px 2px var(--color-scheme)",
                    width:"80px", height:"80px",
                    '&:hover': {
                        backgroundColor:"white",
                        transform: "scale(1.1)",
                        boxShadow:" 0 0 10px 2px var(--color-scheme)"
                    }
                }}
                size="large"
                onClick={() => setIsChatOpen(prevState => !prevState)}>
                {isChatOpen ? <ChatOffIcon sx={{fontSize: '3rem', color: 'var(--color-1)'}}/>
                    :
                    <ChatIcon sx={{fontSize: '3rem', color: 'var(--color-scheme)'}}/>}
            </IconButton>

                    <Box sx={{
                        opacity:isChatOpen?"100%":"0%",
                        scale:isChatOpen?"1":"0",
                        position: 'fixed',
                        bottom: '5%',
                        left: '9%',
                        zIndex: 1000,
                    }}
                         width={"30%"}
                         minWidth={"400px"}
                         minHeight={"300px"}
                         height={"75%"}
                         ref={chatPageRef}
                    >
                        <ChatPage/>
                    </Box>

        </Box>
    );
}

export default NavBar;