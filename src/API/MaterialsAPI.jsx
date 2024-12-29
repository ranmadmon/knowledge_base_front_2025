import axios from "axios"
import * as Constants from "../Utils/Constants.jsx";
import Cookies from "universal-cookie";
import {SERVER_URL} from "../Utils/Constants.jsx";

const cookies = new Cookies(null, {path: '/'});
const token = cookies.get("token");


export async function getMaterialsHistory() {
    const params = {
        token: token
    }
    try {
        const response = await axios.get(Constants.SERVER_URL + "/get-material-history", {params})
        return await response?.data;

    } catch (error) {
        console.error('Error:', error);
    }
}

export async function addMaterial(chosenTitle, chosenType, courseID, chosenDescription, chosenTag, chosenContent) {
    const params = {
        token: token,
        title: chosenTitle,
        type: chosenType,
        courseId: courseID,
        description: chosenDescription,
        tag: chosenTag,
        content: chosenContent,
    }

    try {

        const response = await axios.get(SERVER_URL + "/add-material", {params})
        return await response?.data;
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function getTypes() {
    try {
        const response = await axios.get(SERVER_URL + "/get-types")
        return await response?.data;
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function getTags() {
    try {
        const response = await axios.get(SERVER_URL + "/get-tags")
        return await response?.data;
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function getMaterials(courseID) {
    const params = {
        courseId: courseID,
    }
    try {
        const response = await axios.get(SERVER_URL + "/get-materials-by-course-id", {params})
        return await response?.data;
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function getMaterialById(materialId) {
    const params = {
        materialId: materialId,
    }
    try {
        const response = await axios.get(SERVER_URL + "/get-material-by-id", {params})
        return await response?.data;
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function addToMaterialHistory(materialId) {
    const params = {
        token: token,
        materialId: materialId,
    }

    try {
        const response = await axios.get(SERVER_URL + "/add-material-to-history", {params})
        return await response?.data;
    } catch (error) {
        console.error('Error:', error);
    }
}


