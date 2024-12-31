import axios from "axios";
import {PERMISSION_URL, SERVER_URL} from "../Utils/Constants.jsx";
import Cookies from "universal-cookie";

export async function getUserPermission () {
    const cookies = new Cookies(null, {path: '/'});
    const token = cookies.get("token");

    const params = {
        token: token
    }

    try {
        const response = await axios.get(SERVER_URL+PERMISSION_URL,{params});
        return await response.data;
    }  catch (error) {
        console.error('Error:', error);
    }
}