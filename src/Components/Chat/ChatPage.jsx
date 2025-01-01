import React, {useEffect, useRef} from 'react';
import {sendChat} from "../../API/ChatApi.jsx";
import Cookies from "universal-cookie";
import {IconButton, Stack, TextField} from "@mui/material";
import ChatBubble from "./ChatBubble.jsx";
import {SERVER_URL} from "../../Utils/Constants.jsx";
import Send from '@mui/icons-material/Send';
import PropTypes from "prop-types";

ChatPage.propTypes = {
    isChatOpen: PropTypes.bool.isRequired,
    setChatNotification: PropTypes.func.isRequired,
    chatNotification: PropTypes.number.isRequired
}

function ChatPage(props) {
    const cookies = new Cookies(null, {path: '/'});
    const token = cookies.get("token");
    const id = cookies.get("id");
    const [messages, setMessages] = React.useState([]);
    // const [message, setMessage] = React.useState('');

    const lastMessage = useRef(null);
    const messageInputRef = useRef(null);
    const ref = useRef(null);


    useEffect(() => {
        const sse = new EventSource(SERVER_URL + "/sse/stream?token=" + token);
        sse.addEventListener("message", (event) => {
            const messages = JSON.parse(event.data);
            setMessages(prevMessages => [...prevMessages, ...messages]);
            setNoti(messages.length)
        });
        return () => {
            sse.close();
        }
    }, [token]);


    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage()
        }
    }

    async function sendMessage() {
        if (messageInputRef.current.value.trim().length > 0) {
          const message= messageInputRef.current.value;
            messageInputRef.current.value = "";
            const response = await sendChat(message)
        }
    }

    function setNoti(count) {
        if (props.isChatOpen) {
            props.setChatNotification(0);
        }
        if (!props.isChatOpen) {
            props.setChatNotification(prev => prev + count);
        }
    }


    useEffect(() => {
        if (lastMessage.current && props.isChatOpen) {
            lastMessage.current.scrollIntoView({behavior: 'smooth'});
            setNoti(0)
        }


    }, [messages, props.isChatOpen]);


    useEffect(() => {
        if (messageInputRef.current && props.isChatOpen) {
            messageInputRef.current.focus();
        }

    }, [props.isChatOpen]);


    return (
        <Stack spacing={2}
               ref={ref}
               sx={{
                   padding: 1,
                   width: "100%",
                   height: "100%",
                   display: "flex",
                   flexDirection: "column",
                   alignSelf: "center",
                   backdropFilter: 'blur(10px)',
                   borderRadius: 2,
                   border: '3px solid rgba(0,0,0,.1)',
               }}>

            <Stack
                spacing={2}
                maxWidth={"100%"}
                sx={{
                    padding: 1,
                    overflowY: "auto",
                    display: 'flex',
                    flexDirection: 'column',
                    '&::-webkit-scrollbar': {
                        width: '0.4em',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'rgba(0,0,0,.1)',
                    }
                }}>
                {
                    messages.map((message, index) => {
                        const isSender = message.sender.id === id;
                        return (
                            <div ref={index === messages.length ? null : lastMessage} key={message.id}
                                 style={{alignSelf: !isSender && "flex-end"}}>
                                <ChatBubble id={id} isSender={isSender} message={message}/>
                            </div>
                        )

                    })

                }
            </Stack>

            <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <TextField
                    InputProps={{
                        endAdornment: (
                            <IconButton onClick={sendMessage}>
                                <Send/>
                            </IconButton>
                        ),
                    }}
                    inputRef={messageInputRef}
                    onKeyDown={handleKeyDown}
                    type="text"
                    style={{width: "100%"}}
                    label="Send Message"
                    placeholder="Write your message here"
                    multiline
                />

            </div>
        </Stack>
    );
}

export default ChatPage;