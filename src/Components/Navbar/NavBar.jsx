import "../CssFiles/NavBar.css";
import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import ClickOutside from "./ClickOutside.jsx";
import {
    DASHBOARD_URL,
    LOGIN_URL,
    MathematicalExercises_URL,
    PlayersProgressDashboard_URL,
    UserDetails_URL,
} from "../../Utils/Constants.jsx";
import Cookies from "universal-cookie";
import { getUserName } from "../../API/ProfileAPI.jsx";
import axios from "axios";


function NavBar() {
    const navigate = useNavigate();
    const [homeClicked, setHomeClicked] = useState(false);
    const [practiceClicked, setPracticeClicked] = useState(false);
    const [mathematicalExercisesClicked, setMathematicalExercisesClicked] = useState(false);
    const [dataVisible, setDataVisible] = useState(false);
    const [userName, setUserName] = useState("");
    const [dropdownVisible, setDropdownVisible] = useState(false); // שליטה בתיבת הפרופיל
    const [notificationsVisible, setNotificationsVisible] = useState(false); // שליטה בתיבת ההתראות
    const [notifications, setNotifications] = useState([]);
    const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);

    const cookies = new Cookies();
    const token = cookies.get("token");

    function handleDataVisible() {
        setDataVisible(!dataVisible);
    }

    function toggleDropdown() {
        setDropdownVisible(!dropdownVisible);
    }

    // בעת לחיצה על כפתור ההתראות – טוענים את ההתראות (אם לא נטענו כבר)
    async function handleNotificationsClick() {
        setNotificationsVisible(!notificationsVisible);
        if (!notificationsVisible) {
            try {
                const response = await axios.get("http://localhost:8080/get-notifications", {
                    params: { token: token },
                });
                setNotifications(response.data);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        }
    }

    // פונקציה לסימון התראה כנקראת
    async function markNotificationAsRead(notificationId) {
        try {
            await axios.post("http://localhost:8080/mark-notification-read", null, {
                params: { notificationId: notificationId },
            });
            setNotifications((prevNotifications) =>
                prevNotifications.filter((notif) => notif.id !== notificationId)
            );
            // עדכון hasUnreadNotifications לאחר הסרת ההתראה
            if (notifications.length - 1 === 0) {
                setHasUnreadNotifications(false);
            }
        } catch (error) {
            console.error("Error marking notification as read:", error);
        }
    }

    // useEffect שמעדכן את ה-UI עבור dataVisible
    useEffect(() => {
        const navbarUl = document.querySelector(".navbar ul");
        if (navbarUl) {
            navbarUl.setAttribute("data-visible", dataVisible.toString());
        }
    }, [dataVisible]);

    // טעינת שם המשתמש
    useEffect(() => {
        const fetchData = async () => {
            setUserName(await getUserName());
        };
        fetchData();
    }, []);

    // useEffect לקריאה מידית לבדיקה של ההתראות הלא נקראות (על mount)
    useEffect(() => {
        async function checkNotifications() {
            try {
                const response = await axios.get("http://localhost:8080/get-notifications", {
                    params: { token: token },
                });
                if (response.data && response.data.length > 0) {
                    setHasUnreadNotifications(true);
                } else {
                    setHasUnreadNotifications(false);
                }
            } catch (error) {
                console.error("Error checking unread notifications:", error);
            }
        }
        checkNotifications();
    }, [token]);

    // useEffect לפולינג כל 2 דקות לבדוק אם קיימות התראות שלא נקראו
    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const response = await axios.get("http://localhost:8080/get-notifications", {
                    params: { token: token },
                });
                if (response.data && response.data.length > 0) {
                    setHasUnreadNotifications(true);
                } else {
                    setHasUnreadNotifications(false);
                }
            } catch (error) {
                console.error("Error checking unread notifications:", error);
            }
        }, 120000);
        return () => clearInterval(interval);
    }, [token]);

    return (
        <Box>
            <Stack spacing={14} width={"100%"}>
                <ClickOutside onClickOutside={() => { setDropdownVisible(false); setNotificationsVisible(false); }}>
                    <nav className="navbar">
                        <div className="navbar-logo-container">
                            <img
                                className="navbar-logo"
                                src="src/assets/navbar/math-logo.png"
                                alt="logo"
                            />
                        </div>
                        <ul id="navbar-ul" tabIndex={1}>
                            <div className="right-buttons">
                                <li>
                                    <button
                                        aria-expanded={homeClicked ? "true" : "false"}
                                        className="navbar-button"
                                        onClick={() => {
                                            navigate(DASHBOARD_URL);
                                            handleDataVisible();
                                            setHomeClicked(true);
                                            setPracticeClicked(false);
                                            setMathematicalExercisesClicked(false);
                                        }}
                                    >
                                        Home
                                    </button>
                                </li>
                                <li>
                                    <button
                                        aria-expanded={practiceClicked ? "true" : "false"}
                                        className="navbar-button"
                                        onClick={() => {
                                            navigate(PlayersProgressDashboard_URL);
                                            handleDataVisible();
                                            setPracticeClicked(true);
                                            setHomeClicked(false);
                                            setMathematicalExercisesClicked(false);
                                        }}
                                    >
                                        PlayersProgressDashboard
                                    </button>
                                </li>
                                <li>
                                    <button
                                        aria-expanded={mathematicalExercisesClicked ? "true" : "false"}
                                        className="navbar-button"
                                        onClick={() => {
                                            navigate(MathematicalExercises_URL);
                                            handleDataVisible();
                                            setPracticeClicked(false);
                                            setHomeClicked(false);
                                            setMathematicalExercisesClicked(true);
                                        }}
                                    >
                                        mathematicalExercises
                                    </button>
                                </li>
                                <div className="profile-container">
                                    {/* כפתור ההתראות עם שינוי תמונה בהתאם */}
                                    <button className="notification-button" onClick={handleNotificationsClick}>
                                        <img
                                            src={
                                                hasUnreadNotifications
                                                    ? "src/assets/navbar/notificationPlus.png"
                                                    : "src/assets/navbar/notification.png"
                                            }
                                            alt="Notifications"
                                        />
                                    </button>
                                    {/* חלונית ההתראות */}
                                    {notificationsVisible && (
                                        <div className="notifications-dropdown">
                                            {notifications.length === 0 ? (
                                                <p className="no-notifications">No notifications</p>
                                            ) : (
                                                notifications.map((notif) => (
                                                    <div
                                                        key={notif.id}
                                                        className="notification-item"
                                                        onClick={() => markNotificationAsRead(notif.id)}
                                                    >
                                                        <p className="notification-message">{notif.message}</p>
                                                        <span className="notification-timestamp">
                              {notif.timestamp.toLocaleString()}
                            </span>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    )}
                                    {/* כפתור הפרופיל */}
                                    <div className="profile-circle" onClick={toggleDropdown}>
                                        {userName.charAt(0).toUpperCase()}
                                    </div>
                                    {dropdownVisible && (
                                        <div className="profile-dropdown">
                                            <button
                                                className="dropdown-button"
                                                onClick={() => {
                                                    toggleDropdown();
                                                    navigate(UserDetails_URL);
                                                    setPracticeClicked(false);
                                                    setHomeClicked(false);
                                                    setMathematicalExercisesClicked(false);
                                                }}
                                            >
                                                Change Details
                                            </button>
                                            <button
                                                className="dropdown-button"
                                                onClick={async () => {
                                                    toggleDropdown();
                                                    const cookies = new Cookies(null, { path: "/" });
                                                    await cookies.remove("token");
                                                    await cookies.remove("id");
                                                    setPracticeClicked(false);
                                                    setHomeClicked(false);
                                                    setMathematicalExercisesClicked(false);
                                                    navigate(LOGIN_URL);
                                                    window.location.reload();
                                                }}
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </ul>
                    </nav>
                </ClickOutside>
                <Outlet />
            </Stack>
        </Box>
    );
}

export default NavBar;
