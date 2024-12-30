import {Avatar, Box, Stack, Typography} from "@mui/material";

function ChatBubble(props) {

    function color(){
        // console.log(props.id +"   " +props.message.sender.id)
        return props.isSender? "rgb(211, 166, 255)":"rgb(211, 211, 211)"
    }
    const boxStyle = {
        backgroundColor: color(),
        borderRadius: '10px',
        padding: '10px',
    }
    return (
        <Stack direction="row" spacing={2}>
            <Avatar alt={props.message.sender.fullName} src="/static/images/avatar/1.jpg" />
            <Box
                sx={boxStyle}
            >
                <Typography variant="subtitle2">{props.message.sender.fullName}</Typography>
                <Typography variant="body2">
                    {props.message.text}
                </Typography>
            </Box>
        </Stack>
    );
}

export default ChatBubble;