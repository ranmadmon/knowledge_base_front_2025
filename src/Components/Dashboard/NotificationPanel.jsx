import React, {useEffect, useState} from "react";
import ListCard from "./ListCard.jsx";
import {getNotifications} from "../../API/NotificationsAPI.jsx";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import {ArrowDropDown} from "@mui/icons-material";
import formatDatetime from "../../Utils/formatDatetime.js";


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
                    <Accordion>
                        <AccordionSummary expandIcon={<ArrowDropDown/>}>
                            <Typography variant="h5">
                                {notification.title}
                            </Typography>

                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                {formatDatetime(notification.date)}
                            </Typography>
                            <Typography>
                                By: {notification?.fromUser?.fullName}
                            </Typography>
                            {notification.content}
                        </AccordionDetails>
                    </Accordion>

                </>

            ))

        )
    }

    return (
        <>
            <Accordion  maxWidth="60%" minWidth="60%">
                <ListCard render={renderCourseList} perPage={6} list={notificationList} header={"Notifications"}/>
            </Accordion>
        </>
    )
}


export default NotificationPanel;