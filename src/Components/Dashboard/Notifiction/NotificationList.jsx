import {useState} from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Box, Button, Skeleton, Stack, Typography} from "@mui/material";
import {ArrowDropDown} from "@mui/icons-material";
import formatDatetime from "../../../Utils/formatDatetime.jsx";
import PropTypes from "prop-types";

NotificationList.propTypes = {
    notificationList: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
}

function NotificationList(props) {
    const [perPage] = useState(4);
    const [currentPg, setCurrentPg] = useState(1);


    function renderList() {
        const startIndex = (currentPg - 1) * perPage;
        const endIndex = startIndex + perPage
        const reversedList = props.notificationList.toReversed()
        const relevantPageList = reversedList.slice(startIndex, endIndex)
        return render(relevantPageList);
    }


    function nextPage() {
        if (currentPg * perPage < props.notificationList.length) {
            setCurrentPg((prevPage) => prevPage + 1);
        }
    }

    function previousPage() {
        if (currentPg > 1) {
            setCurrentPg((prevPage) => prevPage - 1);
        }
    }



    function render(relevantPageList) {
        const width = "100%"
        const height = "45px"

        return (
            <>
                {
                    props.isLoading ?
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
                            {relevantPageList.length === 0 && <Typography> Nothing to show here</Typography>}


                            {relevantPageList.map((notification) => (

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
            </>
        )
    }

    return (
        <Box>

            <Typography margin={2} variant={"h4"}> Notification </Typography>
            {renderList()}
            <Stack sx={{flex: 1, m: 2}} justifyContent="center" alignItems="center" direction="row" spacing={2}>
                <Button
                    onClick={previousPage}
                    variant="contained"
                    disabled={currentPg === 1}
                >
                    Previous Page
                </Button>
                <Button
                    variant="contained"
                    onClick={nextPage}
                    disabled={currentPg * perPage >= props.notificationList.length}
                >
                    Next Page
                </Button>
            </Stack>

        </Box>
    );
}

export default NotificationList;