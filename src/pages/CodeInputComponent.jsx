import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Cookies from "universal-cookie";

const CodeInputComponent = () => {
    const location = useLocation();
    const { userName = "Guest", password = "" ,type=""} = location.state || {}; // ברירת מחדל
    const [code, setCode] = useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {
       if(type==="register"){

           axios.get("http://localhost:8080/check-otp-to-register?username="+userName+"&otp="+code)
               .then(response => {
                   if (response.data.success){
                       if (!response.data.registeredSuccessfully){
                           console.log("no" + userName)
                       }else{
                           console.log(response.data)
                           navigate("/");
                       }
                   }
               })
       }else if(type==="login"){

           axios.get("http://localhost:8080/check-otp?username="+userName+"&password="+password+"&otp="+code)
               .then(response => {
                   if (response.data.success){
                       if (!response.data.success){
                           console.log("no" + userName)
                       }else{
                           console.log(response.data)
                           const cookies = new Cookies(null, { path: '/login' });
                           const token = cookies.get("token");
                           if (token) {
                               navigate("/dashboard");
                           }
                       }
                   }
               })
       }

    };

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h1>Enter Code</h1>
            <p>Welcome, {userName}</p>
            <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter your code"
                style={{ padding: "10px", fontSize: "16px", width: "300px" }}
            />
            <br />
            <button
                onClick={handleSubmit}
                style={{
                    marginTop: "10px",
                    padding: "10px 20px",
                    fontSize: "16px",
                    cursor: "pointer",
                }}
            >
                Submit
            </button>
        </div>
    );
};

export default CodeInputComponent;
