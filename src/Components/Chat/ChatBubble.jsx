import {Avatar, Box, Stack, Typography} from "@mui/material";
import PropTypes from "prop-types";
import formatDatetime from "../../Utils/formatDatetime.jsx";

ChatBubble.propTypes = {
    message: PropTypes.shape({
        id: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        sender: PropTypes.shape({
            id: PropTypes.number.isRequired,
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            fullName: PropTypes.string.isRequired,
            phoneNumber: PropTypes.string.isRequired,
            course: PropTypes.any,
            username: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    id: PropTypes.number.isRequired,
    isSender: PropTypes.bool.isRequired,
};

function ChatBubble(props) {
    function color() {
        return props.isSender ? "rgb(211, 166, 255)" : "rgb(211, 211, 211)"
    }

    function getRandomColor(id) {
        const letters = '0123456789ABCDEF';
        let color = '#';
        let seed = id.toString().split('')
            .reduce((acc, char) => acc + char.charCodeAt(0), 0);
        for (let i = 0; i < 6; i++) {
            const randomIndex = (seed + i) % 16;
            color += letters[randomIndex];
        }
        return color;
    }

    const boxStyle = {
        backgroundColor: color(),
        borderRadius: '10px',
        padding: '10px',
        maxWidth: '80%',
        wordBreak: 'break-word'
    }

    const avatar = () => {
        return <Avatar sx={{bgcolor: getRandomColor(props.message.sender.id)}}>
            {props.message.sender.firstName.charAt(0).toUpperCase()}
            {props.message.sender.lastName.charAt(0).toUpperCase()}
        </Avatar>
    }

    return (
        <Stack direction="row" spacing={2} alignItems="flex-start">
            {props.isSender && avatar()}
            <Box>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="subtitle2" fontWeight="bold">
                        {props.message.sender.fullName}
                    </Typography>
                </Stack>
                <Box sx={boxStyle}>
                    <Typography>
                        {props.message.text}
                    </Typography>
                    <Typography noWrap={true} sx={{
                        color: '#888',
                        fontSize: '0.75rem',
                        minWidth: "110%"
                    }}>
                        {formatDatetime(new Date(props.message.date))}
                    </Typography>
                </Box>
            </Box>
            {!props.isSender && avatar()}
        </Stack>
    );
}

export default ChatBubble;