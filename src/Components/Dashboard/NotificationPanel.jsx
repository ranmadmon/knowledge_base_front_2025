import React, {useEffect, useState} from "react";
import ListCard from "./ListCard.jsx";
import {getNotifications} from "../../API/NotificationsAPI.jsx";
import {Accordion, AccordionDetails, AccordionSummary, Box, Skeleton, Stack, Typography} from "@mui/material";
import {ArrowDropDown} from "@mui/icons-material";
import formatDatetime from "../../Utils/formatDatetime.js";


function NotificationPanel() {
    const [notificationList, setNotificationList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setNotificationList(await getNotifications());
            await setIsLoading(false)

        }
        fetchData()
    }, []);

    function renderCourseList(coursesList) {
        const width = "100%"
        const height = "45px"

        return (
            isLoading ?
                <>
                    <Stack spacing={2}>
                        <Skeleton variant="rectangular" height={height} width={width}/>
                        <Skeleton variant="rectangular" height={height} width={width}/>
                        <Skeleton variant="rectangular" height={height} width={width}/>
                        <Skeleton variant="rectangular" height={height} width={width}/>
                        <Skeleton variant="rectangular" height={height} width={width}/>
                        <Skeleton variant="rectangular" height={height} width={width}/>
                    </Stack>
                </>
                :
                <>
                    {coursesList.length === 0 && <Typography> Nothing to show here</Typography>}
                    {coursesList.map((notification) => (

                        <Accordion key={notification.id} >
                            <AccordionSummary expandIcon={<ArrowDropDown/>}>
                                <Typography variant="h5" sx={{width:"100%"}}>
                                    <Stack sx={{display: "flex",flexDirection:"row",width:"100%", justifyContent:"space-between", alignItems:"center"}}>
                                        <Typography sx={{fontSize:28}}>
                                            {notification.title}
                                        </Typography>
                                        <Typography sx={{justifyContent:"end"}}>
                                            {formatDatetime(notification.date)}
                                        </Typography>
                                    </Stack>

                                </Typography>

                            </AccordionSummary>
                            <AccordionDetails>

                                <Typography>
                                    By: {notification?.fromUser?.fullName}
                                </Typography>
                                {notification.content}
                            </AccordionDetails>
                        </Accordion>


                    ))}
                </>
        )
    }

    return (
        <>
            <Accordion>
                <ListCard
                    render={renderCourseList}
                    perPage={6}
                    list={notificationList}
                    header={"Notifications"}
                />
            </Accordion>
        </>
    )
}


export default NotificationPanel;