import axios from "axios"
import * as Constants from "../Utils/Constants.jsx";
export async function getCourses() {
    try {
        const url = `${Constants.URL} getCourses`;
        const response = await axios.get(url);
        if(response.data.success){
            return response.data.courses;
        } else {
            console.error("Error fetching courses:", response.data.message);
            return [];
        }
    } catch (error) {
        console.error("Error fetching courses:", error);
        return [];
    }
}