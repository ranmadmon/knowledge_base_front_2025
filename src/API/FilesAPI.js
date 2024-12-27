import axios from "axios";
import {FILE_ERROR_CODE} from "../Utils/Constants.jsx";

export async function uploadFiles(files ,id) {

    const data = new FormData();
    data.append('id', id);
    for (const file of files) {
        data.append('file', file);

    }

    try {
        const response = await axios.post("http://localhost:8080/upload-files", data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        return response;
    } catch (error) {
        console.error('Error:', error);
        return {status: FILE_ERROR_CODE};
    }
}