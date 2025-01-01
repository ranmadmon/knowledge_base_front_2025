import React, {useEffect, useState} from 'react';
import {Box, Button, ButtonGroup, Card, Stack, Typography} from "@mui/material";
import {getUserPermission} from "../../../API/UserPermission.jsx";
import NotificationList from "./NotificationList.jsx";
import AddNewNotification from "./AddNewNotification.jsx";

function NotificationCard() {
    const [permission, setPermission] = useState(1);
    const [isAddNotifications, setIsAddNotifications] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setPermission(await getUserPermission());
        }
        fetchData()
    }, []);

    return (
        <Card elevation={8} sx={{paddingTop:4 , paddingBottom:4}}>
            <Stack gap={5} alignItems={"center"}>
                {(permission === 2) &&
                    <>
                        <ButtonGroup variant="outlined">
                            <Button variant={!isAddNotifications ? 'outlined' : "contained"}
                                    onClick={() => setIsAddNotifications(true)}>send notification</Button>
                            <Button variant={isAddNotifications ? 'outlined' : "contained"}
                                    onClick={() => setIsAddNotifications(false)}>notifications</Button>
                        </ButtonGroup>
                    </>
                }
                {isAddNotifications ?
                    <Box width={"100%"} alignSelf={"center"}>
                        <AddNewNotification/>
                    </Box>
                    :
                    <Box width={"100%"} alignSelf={"center"}>
                        <NotificationList/>

                    </Box>
                }

            </Stack>
        </Card>
    );
}

export default NotificationCard;