import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import './Form.css';
import axios from "axios";
import Cookies from 'universal-cookie';


function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [revealPassword, setRevealPassword] = useState(false);
    const [errorCode, setErrorCode]= useState(-1);
    const navigate = useNavigate();
    const SERVER_URL = "http://localhost:8080"
    const ERROR_PASSWORD = 401;
    const USER_NOT_EXIST = 400;

    useEffect(() => {
        const cookies = new Cookies(null, { path: '/login' });
        const token = cookies.get("token");
        if (token) {
            navigate("/dashboard");
        }
    }, []);

    function showErrorCode(){

        let errorMessage = "";
        switch (errorCode){

            case -1 : errorMessage = "Please fill in all fields"; break;
            case  USER_NOT_EXIST :errorMessage = "Username doesn't exist, SIGN-UP 😁";break;
            case ERROR_PASSWORD : errorMessage = "Wrong Password";break;
        }
        return errorMessage;
    }

    function login(){

        axios.get(SERVER_URL+"/login?username=" + username + "&password=" + password)
            .then(response => {

                if (!response.data.success){
                    console.log(response.data);
                    setErrorCode(response.data.errorCode)
                }else{
                    console.log(response.data);
                    navigate("/codeInputComponent", { state: { userName: username, password: password ,type:"login"} });
                }

            })
    }
    const allFieldsFilled = () => {
        return (
            username.trim() &&
            password.trim()
        );
    };
    function handleRevealPassword(){
        setRevealPassword(!revealPassword)
        if(document.querySelector('input[title="Password"]')!=null){
            if (revealPassword){
                document.querySelector('input[title="Password"]').setAttribute('type', 'text');
            } else {
                document.querySelector('input[title="Password"]').setAttribute('type', 'password');
            }
        }
        console.log(document.querySelector('input[title="Password"]'));
        console.log(revealPassword)
    }
    function getInput(title, value, setValue, type, requirement) {
        return (
            <div className={"input-container"} key={title}>
                <label className={"form-label"}>{title}:</label>
                <input required className={"form-input"}
                       type={type}
                       value={value}
                       onChange={(e) => setValue(e.target.value)}
                       placeholder={title}
                       minLength={requirement}
                />
                {type === "password" && <button className={"forgot-password-button"}>Forgot Password?</button>}
            </div>
        );
    }

    function handleLogin() {
        //some login logic here
    }

    return (
        <div className="form-page">
            <div className="form-container">
                <div className={"right-side"}>
                    <div className={"form-headers"}>
                        <img style={{width: "50px", height: "50px"}} src={"src/assets/book-logo.PNG"} alt={"logo"}/>
                        <text style={{fontSize: "2.4rem", fontWeight: "bold"}}>Login</text>
                        <text style={{fontSize: "1.5rem", fontWeight: "bold"}}>Hi! welcome back 😊</text>
                    </div>
                    <div className={"form"} id="login">
                        {getInput("Username", username, setUsername, "text", 5)}
                        {getInput("Password", password, setPassword, "password", 8)}
                        <label onClick={handleRevealPassword}> {showErrorCode()}</label>

                    </div>
                    <div className={"submit-container"}>
                        <button id={"submit-button"} type="submit" onClick={login}
                                className={allFieldsFilled() ? "active" : ""}
                                disabled={!allFieldsFilled()}>
                            Login
                        </button>
                        <div className={"have-an-account"}>
                            <label>Dont have an account?</label>
                            <button className={"have-an-account-button"} onClick={() => navigate('/register')}> Create
                                Now!
                            </button>
                        </div>
                    </div>

                </div>
                <div className={"left-side"}>
                    <div className={"image-container"}>
                        <img className={"form-image"} style={{width: "500px", height: "500px"}}
                             src={"src/assets/image10.png"}
                             alt={"login-page-image"}/>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Login;