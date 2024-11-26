import axios from "axios";
import * as Constants from "../Utils/Constants.jsx";

export async function getLastActivity(userId) {
    try{
        const params={
            activityId:userId.activitysIds
        }
        const  url = `${Constants.URL}getLastActivity`;
        const response=( await axios.get(url, {params}));
        if(response.data.success){
            return response.data?.activitys?.map((activity)=> activity);
        }else {
            console.error(response.data);
            return [""]
        }
    }catch (error){
        console.log(error);
    }
}
