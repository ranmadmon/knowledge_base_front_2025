import "./Course.css"
import {useState,useEffect} from "react";
import axios from "axios";
import NavBar from "../Components/Dashboard/NavBar.jsx";
export default function Course(props){


    return (
        <div>
             <h1>
                 {props.name}
             </h1>
        </div>
    )
}