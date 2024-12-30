import axios from "axios";
import {SERVER_URL} from "../Utils/Constants.jsx";
import Cookies from "universal-cookie";



const cookies = new Cookies(null, {path: '/'});
const token = cookies.get("token");


export async function sendChat(message) {
    const params = {
        message: message,
        token:token,
    }
    try {
        const response = await axios.get(SERVER_URL+"/send-message", {params})
        return await response?.data;

    } catch (error) {
        console.error('Error:', error);
    }
}