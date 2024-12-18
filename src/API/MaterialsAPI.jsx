import axios from "axios"
import * as Constants from "../Utils/Constants.jsx";

export async function getMaterialsHistory() {
    try {
        //TODO  get-material-history היי חברי הצוות של ליאור בשביל למשוך מהשרת את המטיראל של היוזר יש להשתמש בנתיב -
        const response = await axios.get(Constants.URL+"/get-materials-history", {})
        console.log(response)
        return await response?.data;

    } catch (error) {
        console.error('Error:', error);
    }

}