import axios from "axios";
import {FILE_ERROR_CODE, SERVER_URL} from "../Utils/Constants.jsx";

export async function uploadFiles(files ,id) {

    const data = new FormData();
    data.append('id', id);
    for (const file of files) {
        data.append('file', file);

    }

    try {
        const response = await axios.post(SERVER_URL + "/upload-files", data, {
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

export async function getMaterialFiles(materialId) {
    const params = {
        materialId: materialId,
    }
    try {
        const response = await axios.get(SERVER_URL + "/get-material-files-by-id", {params})
        return await response?.data;
    } catch (error) {
        console.error('Error:', error);
    }
}


export async function deleteMaterialFiles(materialId, fileName) {
    const data = new FormData();
    data.append('materialId', materialId);
    for (const file of fileName) {
        data.append('fileNames', file);

    }
    try {

        const response = await axios.delete(SERVER_URL + "/delete-material-files-by-id-and-name", {data},{ headers: {
                "Content-Type": "multipart/form-data"
            }})
        return await response?.data;
    } catch (error) {
        console.error('Error:', error);
    }
}