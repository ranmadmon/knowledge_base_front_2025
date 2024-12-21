import axios from "axios"
import * as Constants from "../Utils/Constants.jsx";
import Cookies from "universal-cookie";

export async function getMaterialsHistory() {
    const cookies = new Cookies(null, { path: '/' });
    const token = cookies.get("token");

    const params={
     token:token
    }
    try {
        const response = await axios.get(Constants.URL+"/get-material-history", {params})
        return await response?.data;

    } catch (error) {
        console.error('Error:', error);
    }

}