import React, {useEffect, useState} from 'react';
import {Box, Card, Stack, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {getUserPermission} from "../../../API/UserPermission.jsx";
import NotificationList from "./NotificationList.jsx";
import AddNewNotification from "./AddNewNotification.jsx";

function NotificationCard() {
    const [permission, setPermission] = useState(1);
    const [isAddNotifications, setIsAddNotifications] = useState(false);
    const [alignment, setAlignment] = React.useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [notificationList, setNotificationList] = useState([]);

    const cookies = new Cookies(null, {path: '/'});
    const token = cookies.get("token");

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    useEffect(() => {
        const fetchData = async () => {
            setPermission(await getUserPermission());
        }
        fetchData()
    }, []);


    useEffect(() => {
        //handleGetNotifications()
        const sse = new EventSource(SERVER_URL + "/sseNotification/stream?token=" + token);

        sse.addEventListener("message", (event) => {
            try {
                const notifications = event.data ? JSON.parse(event.data) : [];
                setNotificationList(prevNotifications => [...prevNotifications, ...notifications]);
                setIsLoading(false)

            } catch (e) {
                console.error("Error parsing SSE message:", e);
            }
        });

        return () => {
            sse.close();
        };
    }, [token]);

    return (
        <Card elevation={8} sx={{paddingTop:4 , paddingBottom:4}}>
            <Stack gap={5} alignItems={"center"}>
                {(permission === 2) &&
                    <>
                        <ToggleButtonGroup
                            color="primary"
                            value={alignment}
                            exclusive
                            onChange={handleChange}
                            aria-label="Platform"
                        >
                            <ToggleButton value="send notification"  onClick={() => setIsAddNotifications(true)}>send notification</ToggleButton>
                            <ToggleButton value="notifications"  onClick={() => setIsAddNotifications(false)}>notifications</ToggleButton>
                        </ToggleButtonGroup>
                    </>
                }
                {isAddNotifications ?
                    <Box width={"100%"} alignSelf={"center"}>
                        <AddNewNotification/>
                    </Box>
                    :
                    <Box width={"100%"} alignSelf={"center"}>
                        <NotificationList notificationList={notificationList} isLoading={isLoading}/>

                    </Box>
                }

            </Stack>
        </Card>
    );
}

export default NotificationCard;