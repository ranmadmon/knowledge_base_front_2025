import axios from "axios";
import {SERVER_URL} from "../Utils/Constants.jsx";

 export async function getNotifications() {
        try {
            const response = await axios.get(SERVER_URL+"/get-notifications", {})
            return await response?.data;

        } catch (error) {
            console.error('Error:', error);
        }
}
