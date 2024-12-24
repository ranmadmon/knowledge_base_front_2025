import axios from "axios"
import * as Constants from "../Utils/Constants.jsx";
import {useEffect, useState} from "react";
import Cookies from "universal-cookie";

export async function getMaterialsHistory() {
    const [token,setToken]=useState("")
    useEffect(() => {
        const cookies = new Cookies(null, { path: '/login' });
        const token = cookies.get("token");
        if (token) {
          setToken(token)
        }
    }, []);



    try {
        //TODO  get-material-history היי חברי הצוות של ליאור בשביל למשוך מהשרת את המטיראל של היוזר יש להשתמש בנתיב -
        const response = await axios.get(Constants.URL+"/get-material-history?token="+token)
        console.log(response)
        return await response?.data;

    } catch (error) {
        console.error('Error:', error);
    }

}