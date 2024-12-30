import React, {useEffect} from 'react';
import {sendChat} from "../API/ChatApi.jsx";
import Cookies from "universal-cookie";
import {Stack, TextField} from "@mui/material";
import ChatBubble from "./Chat/ChatBubble.jsx";
import {SERVER_URL} from "../Utils/Constants.jsx";
import Send from '@mui/icons-material/Send';

function ChatPage() {
    const cookies = new Cookies(null, {path: '/'});
    const token = cookies.get("token");
    const id = cookies.get("id");

    const [messages, setMessages] = React.useState([]);
    const [message, setMessage] = React.useState('');


        useEffect(() => {
            const sse = new EventSource(SERVER_URL + "/sse/stream?token=" + token);
            sse.addEventListener("message", (event) => {
                console.log(event.data.length)
                const messages = JSON.parse(event.data);
                setMessages(prevMessages => [...prevMessages, ...messages]);
                console.log("Received message", messages);
            });
        }, []);


    async function sendMessage() {
    const response = await sendChat(message)
    console.log(response)

    setMessage("")
}

    return (
        <div>

            <h1>Chat</h1>

            <div>
                <div style={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                    <TextField
                        type="text"
                        style={{width:"100%"}}
                        value={message}
                        label="Send Message"
                        placeholder="Write your message here"
                        onChange={(event) => setMessage(event.target.value)}
                        multiline
                    />
                    <button
                        onClick={sendMessage}
                        style={{
                            marginBlockEnd:"1rem"
                        }}><Send/></button>
                </div>

                <Stack  spacing={2} sx={{
                    width:"95%",
                    maxHeight:"50%",
                    display: 'flex',
                    flexDirection: 'column',
                    border:"3px solid red"
                }}>
                {
                    messages.map((message)=>{
                        const isSender = message.sender.id === id;
                        return(
                            <div style={{alignSelf: isSender && "flex-end"}}>
                                <ChatBubble key={message.id} id={id} isSender={isSender} message={message} />
                            </div>
                        )
                    })
                }
                </Stack>
            </div>
           </div>
    );
}

export default ChatPage;