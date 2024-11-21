import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from "axios";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorCode, setErrorCode]= useState(-1);

    const navigate = useNavigate();

    const SERVER_URL = "http://localhost:8080"
    const ERROR_PASSWORD = 401;
    const USER_NOT_EXIST = 400;

    function showErrorCode(){

        let errorMessage = "";
        switch (errorCode){

            case -1 : errorMessage = "Please fill in all fields"; break;
            case  USER_NOT_EXIST :errorMessage = "Not exist, SIGN-UP 😁";break;
            case ERROR_PASSWORD : errorMessage = "Error password";break;
        }
        return errorMessage;
    }

    function login(){
        axios.get(SERVER_URL+"/login?username=" + username + "&password=" + password)
            .then(response => {
                if (response.data.success){
                    if (!response.data.loginSuccessful){
                        setErrorCode(response.data.errorCode)
                    }else{
                        navigate("/dashboard");
                    }
                }
            })
    }

    return (
        <div>
            <p>This is the Login page</p>
            <div>
                <label>User Name:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
            </div>
            <div>
                <button onClick={login}>Login</button>
                <button onClick={() => navigate('/register')}> Register</button>
                <button>Forget Password</button>
            </div>
            <label> {showErrorCode()}</label>
        </div>
    );
}

export default Login;