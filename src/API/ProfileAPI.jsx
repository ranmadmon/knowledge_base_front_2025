import axios from "axios"
import Cookies from "universal-cookie";
import {SERVER_URL, USER_NAME_URL} from "../Utils/Constants.jsx";

const cookies = new Cookies(null, {path: '/'});
const token = cookies.get("token");

export async function getUserName() {
    const params = {
        token: token
    }
    try {
        const response = await axios.get(SERVER_URL + USER_NAME_URL, {params})
        return await response.data

    } catch (error) {
        console.error('Error:', error);
    }
}