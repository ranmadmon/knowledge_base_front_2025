import React, {useEffect, useRef} from 'react';
import {sendChat} from "../API/ChatApi.jsx";
import Cookies from "universal-cookie";
import {Card, IconButton, Stack, TextField} from "@mui/material";
import ChatBubble from "./Chat/ChatBubble.jsx";
import {SERVER_URL} from "../Utils/Constants.jsx";
import Send from '@mui/icons-material/Send';

function ChatPage() {
    const cookies = new Cookies(null, {path: '/'});
    const token = cookies.get("token");
    const id = cookies.get("id");
    const [messages, setMessages] = React.useState([]);
    const [message, setMessage] = React.useState('');
    const  lastMessage = useRef(null);


    useEffect(() => {
        const sse = new EventSource(SERVER_URL + "/sse/stream?token=" + token);
        sse.addEventListener("message", (event) => {
            const messages = JSON.parse(event.data);
            setMessages(prevMessages => [...prevMessages, ...messages]);
            console.log("Received message", messages);
        });
        return () => sse.close();
    }, [token]);

    useEffect(() => {
        if (lastMessage.current) {
            lastMessage.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);


    async function sendMessage() {
        const response = await sendChat(message)
        console.log(response)
        setMessage("")
    }

    return (
        <Stack spacing={2}
               sx={{
                   padding: '2%',
                   width: "100%",
                   height: "100%",
                   display: "flex",
                   flexDirection: "column",
                   alignSelf: "center",
                   backdropFilter: 'blur(5px)',
                   border: '3px solid rgba(0,0,0,.1)',
               }}>
            <Stack
                spacing={2}
                maxWidth={"100%"}
                sx={{
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
                    messages.map((message ,index) => {
                        const isSender = message.sender.id === id;
                        return (
                            <div ref={index===messages.length ? null : lastMessage} key={message.id} style={{alignSelf: !isSender && "flex-end"}}>
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
                            <IconButton
                                aria-label="send"
                                onClick={message.length>0?sendMessage:null}
                            >
                                <Send/>
                            </IconButton>
                        ),
                    }}
                    type="text"
                    style={{width: "100%"}}
                    value={message}
                    label="Send Message"
                    placeholder="Write your message here"
                    onChange={(event) => setMessage(event.target.value)}
                    multiline
                />

            </div>
        </Stack>
    );
}

export default ChatPage;