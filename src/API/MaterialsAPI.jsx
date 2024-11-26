import axios from "axios";
import * as Constants from "../Utils/Constants.jsx";
export async function getMaterials(userId) {
    try{
        const params={
            activityId:userId.uplodedMaterials
        }
        const  url = `${Constants.URL}getMaterials`;
        const response=( await axios.get(url, {params}));
        if(response.data.success){
            return response.data?.materials?.map((material)=> material);
        }else {
            console.error(response.data);
            return [""]
        }
    }catch (error){
        console.log(error);
    }
}