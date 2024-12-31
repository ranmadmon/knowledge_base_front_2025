import React, {useEffect, useState} from "react";
import ListCard from "./ListCard.jsx";
import {addNotification, getNotifications} from "../../API/NotificationsAPI.jsx";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box, Button, MenuItem, Select,
    Skeleton,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {ArrowDropDown} from "@mui/icons-material";
import formatDatetime from "../../Utils/formatDatetime.js";
import {getUserPermission} from "../../API/UserPermission.jsx";
import Cookies from "universal-cookie";
import {getCourseByLecturer} from "../../API/CoursesAPI.jsx";


function NotificationPanel() {
    const [notificationList, setNotificationList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [permission, setPermission] = useState(1);
    const [selectedCourseId, setSelectedCourseId] = useState("");
    const [courses, setCourses] = useState([]);
    const cookies = new Cookies(null, {path: '/'});
    const token = cookies.get("token");
    const id = cookies.get("id");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        const fetchData = async () => {
         const response=  await getNotifications()
            setNotificationList(response.reverse());
            await setIsLoading(false)
            setPermission(await getUserPermission());
        }
        const fetchCourses = async () => {
            const course = await getCourseByLecturer(id);
            console.log(course)
            setCourses(course);
        };

        fetchData()
        fetchCourses()
    }, []);


    function handelPermission() {
        return (
            <>
                {(permission === 2) &&
                    <Box sx={{margin: "10px"}}>
                        <Stack direction="column" spacing={2}
                               sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <TextField
                                id="outlined-select-currency"
                                select
                                label="Select your course"
                                value={selectedCourseId}

                                onChange={(e) => {
                                    setSelectedCourseId(e.target.value)
                                }}
                                sx={{width: "40%"}}
                            >
                                {courses.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                label="add notification"
                                variant="outlined"
                                placeholder="enter your notification"
                                multiline
                                onChange={(e) => {
                                    setContent(e.target.value)
                                }}
                                sx={{width: "80%"}}
                            />
                            <TextField
                                label="title"
                                variant="outlined"
                                placeholder="enter your notification title"
                                sx={{width: "80%"}}
                                onChange={(e) => {
                                    setTitle(e.target.value)
                                }}
                            />
                            <Button
                                sx={{minHeight: "50%"}}
                                variant={"outlined"}
                                onClick={() => {
                                    addNotification(token, selectedCourseId, title, content)
                                }}>
                                send notification
                            </Button>
                        </Stack>
                    </Box>
                }
            </>
        )
    }

    function renderCourseList(coursesList) {
        const width = "100%"
        const height = "45px"

        return (
            <>

                {
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

                                <Accordion key={notification.id}>
                                    <AccordionSummary expandIcon={<ArrowDropDown/>}>
                                        <Typography variant="h5" sx={{width: "100%"}}>
                                            <Stack sx={{
                                                display: "flex",
                                                flexDirection: "row",
                                                width: "100%",
                                                justifyContent: "space-between",
                                                alignItems: "center"
                                            }}>
                                                <Typography sx={{fontSize: 28}}>
                                                    {notification.title}
                                                </Typography>
                                                <Typography sx={{justifyContent: "end"}}>
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
                }
                {handelPermission()}
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