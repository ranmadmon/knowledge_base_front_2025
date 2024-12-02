import axios from "axios"
import * as Constants from "../Utils/Constants.jsx";

export async function getMaterials() {
    try {
        const response = await axios.get(Constants.URL+"/get-materials", {})
        console.log(response?.data);
        return await response?.data;

    } catch (error) {
        console.error('Error:', error);
    }

}