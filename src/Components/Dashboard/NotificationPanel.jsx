import React, {useEffect, useState} from "react";
import ListCard from "./ListCard.jsx";
import {getNotifications} from "../../API/NotificationsAPI.jsx";
import Collapsible from "./Collapsable.jsx";


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
                    <Collapsible
                        title={notification.title}
                        date={notification.date}
                        course={notification.course}
                    >
                        {notification.content}
                    </Collapsible>
                </>
            ))
        )
    }

    return (
        <>
            <ListCard render={renderCourseList} perPage={6} list={notificationList} header={"Notifications"}/>
        </>
    )
}


export default NotificationPanel;