import axios from "axios"
import {SERVER_URL} from "../Utils/Constants.jsx";

export async function getCourses() {
    try {
        const response = await axios.get(SERVER_URL+"/get-all-courses", {})
        return await response?.data;

    } catch (error) {
        console.error('Error:', error);
    }
}
export async function getCourse(id) {
    const params = {id: id}

    try {
        const response = await axios.get(SERVER_URL+"/get-course", {params})
        return await response?.data;

    } catch (error) {
        console.error('Error:', error);
    }
}
export async function getCourseByLecturer(userId) {
         const params = {userId: userId}

         try {
             const response = await axios.get(SERVER_URL+"/get-courses-byLecturer", {params})
             return await response?.data;

         } catch (error) {
             console.error('Error:', error);
         }
}