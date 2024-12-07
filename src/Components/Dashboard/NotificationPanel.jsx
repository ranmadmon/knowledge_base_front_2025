import React, {useEffect, useState} from "react";
import ListCard from "./ListCard.jsx";
import {getNotifications} from "../../API/NotificationsAPI.jsx";


function NotificationPanel() {
    const [notificationList, setNotificationList] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            setNotificationList(await getNotifications());
        }
        fetchData()
    }, []);
    function renderCourseList(coursesList) {
        return (
                coursesList.map((notification) => (
                    <>
                        <>id ----- course--------lactchurer</>
                     <h3>{notification.id} - {notification.text}</h3>
                    <div>-----------------</div></>
                ))
        )
    }

    return (
        <>
            <ListCard render={renderCourseList} perPage={6} list={notificationList} header={"Notifications"} />
        </>
    )
}



export default NotificationPanel;