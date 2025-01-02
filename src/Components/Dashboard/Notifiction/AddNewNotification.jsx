import {useEffect, useState} from "react";
import {Alert, Box, Button, MenuItem, Stack, TextField} from "@mui/material";
import Cookies from "universal-cookie";
import {addNotification} from "../../../API/NotificationsAPI.jsx";
import {getCourseByLecturer} from "../../../API/CoursesAPI.jsx";

function AddNewNotification() {
    const [courses, setCourses] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [empty, setEmpty] = useState(false);
    const [fail,setFail]=useState(true);
    const cookies = new Cookies(null, {path: '/'});
    const token = cookies.get("token");
    const id = cookies.get("id");

    useEffect(() => {
        const fetchCourses = async () => {
            const course = await getCourseByLecturer(id);
            console.log(course)
            setCourses(course);
        };
        fetchCourses()
    }, []);

     function sendNotification() {
        if (title.length > 0 && content.length > 0 && selectedCourseId ) {
            addNotification(token, selectedCourseId, title, content)
            setContent("")
            setTitle("")
            setSelectedCourseId("")
            setEmpty(false);
        } else {
            setEmpty(true);
        }
    }

    return (
        <Box sx={{margin: "10px"}}>
            <Stack direction="column" spacing={2}
                   sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>

                {empty&& <Alert onLoad={ ()=>setFail(true)} severity={"error"}>Fill all the fields before submitting!</Alert>}
                {(!fail&&!empty)&& <Alert severity={"success"}> add successfully </Alert>}
                <TextField
                    select
                    label="Select course"
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
                    value={title}
                    label="title"
                    variant="outlined"
                    placeholder="enter your notification title"
                    sx={{width: "80%"}}
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                />
                <TextField
                    value={content}
                    label="content"
                    variant="outlined"
                    placeholder="enter your content"
                    multiline
                    rows={8}
                    onChange={(e) => {
                        setContent(e.target.value)
                    }}
                    sx={{width: "80%"}}
                />
                <Button
                    variant={"outlined"}
                    onClick={() => {
                        setFail(false)
                        sendNotification()
                    }}>
                    send notification
                </Button>
            </Stack>
        </Box>
    );
}

export default AddNewNotification;

