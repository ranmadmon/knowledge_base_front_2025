import axios from "axios";
import {NOTIFICATION_URL, SERVER_URL} from "../Utils/Constants.jsx";

 export async function getNotifications() {
        try {
            const response = await axios.get(SERVER_URL+"/get-notifications", {})
            return await response?.data;

        } catch (error) {
            console.error('Error:', error);
        }
}
export async function addNotification(token,courseId,title,content) {
    const params = {
        token: token,
        courseId: courseId,
        title: title,
        content: content,
    }
    try {
        const response = await axios.get(SERVER_URL+NOTIFICATION_URL, {params})
        return await response?.data;

    } catch (error) {
        console.error('Error:', error);
    }
}
