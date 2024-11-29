import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Form.css';
import axios from "axios";

function Register() {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [email, setEmail] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [errorCode, setErrorCode]= useState(-1);

    const navigate = useNavigate();

    const SERVER_URL = "http://localhost:8080"
    const INVALID_REPEAT_PASSWORD = 102;
    const USERNAME_NOT_AVAILABLE = 103

    function register(){
        console.log("rrrrr")

        axios.get(SERVER_URL+"/register?userName="+username + "&password=" + password
            +"&name="+name+ "&lastName="+lastName+"&email=" + email +"&role="+ jobTitle)
            .then(response => {
                if (response.data.success){
                    if (!response.data.registeredSuccessfully){
                        setErrorCode(USERNAME_NOT_AVAILABLE)
                    }else{
                        console.log(response.data)
                        navigate("/login");
                    }
                }
            })
    }
    const allFieldsFilled = () => {
        return (
            name.trim() &&
            lastName.trim() &&
            username.trim() &&
            password.trim() &&
            passwordConfirm.trim() &&
            email.trim() &&
            jobTitle.trim()
        );
    };

    function getInput(title, value, setValue, type = "text") {
        return (
            <div className={"input-container"} key={title}>
                <label className={"form-label"}>{title}:</label>
                <input className={"form-input"}
                    type={type}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={title}
                />
            </div>
        );
    }

    function handleRegister(event) {
        event.preventDefault(); // מונע רענון של הדף
        if (password !== passwordConfirm) {
            setErrorCode(INVALID_REPEAT_PASSWORD);
        } else {
            register();
        }
    }

    function showErrorCode(){

        let errorMessage = "";
        switch (errorCode){

            case -1 : errorMessage = "Please fill in all fields"; break;
            case  USERNAME_NOT_AVAILABLE :errorMessage = "Username not available";break;
            case INVALID_REPEAT_PASSWORD : errorMessage ="Invalid repeat password ";break;
        }
        return errorMessage;
    }

    return (
        <div className="form-page">
            <div className="form-container">
                <div className={"right-side"}>
                    <div className={"form-headers"}>
                        <img style={{width: "50px", height: "50px"}} src={"src/assets/book-logo.PNG"} alt={"logo"}/>
                        <h1 style={{height: "40px"}}>Register</h1>
                        <h3 style={{height: "5px"}}>Thank you for joining us</h3>
                        <h4 style={{height: "5px"}}>please provide all the info below to get started 🫡</h4>
                    </div>

                    <form className={"form"} onSubmit={handleRegister}>
                        {/* Form fields using getInput */}
                        <div className="input-pair">
                            {getInput("Name", name, setName)}
                            {getInput("Last Name", lastName, setLastName)}
                        </div>

                        <div className="input-pair">
                            {getInput("Username", username, setUsername)}
                            {getInput("Email", email, setEmail, "email")}
                        </div>
                        <div className="input-pair">
                            {getInput("Password", password, setPassword, "password")}
                            {getInput("Password Confirm", passwordConfirm, setPasswordConfirm, "password")}
                        </div>

                        <div className="input-pair">
                            <div className={"input-container"}>
                                <label className={"form-label"}>Job Title:</label>
                                <select className={"form-input"} value={jobTitle}
                                        onChange={(e) => setJobTitle(e.target.value)}>
                                    <option value="" disabled>Select Job Title</option>
                                    <option value="Student">Student</option>
                                    <option value="Lecturer">Lecturer</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                            <div className="input-container">
                                <label className={"form-label"}></label>
                                <button id={"submit-button"} type="submit"
                                        className={allFieldsFilled() ? "active" : ""}
                                        disabled={!allFieldsFilled()}>
                                    Register Now
                                </button>
                            </div>
                        </div>
                        <div className={"have-an-account"}>
                            <label>Already have an account?</label>
                            <button className={"have-an-account-button"} onClick={() => navigate('/')}> Login Now!</button>
                        </div>

                        <label> {showErrorCode()}</label>
                    </form>
                </div>
                <div className={"left-side"}>
                    <div className={"image-container"}>
                        <img style={{width: "25vw", height: "40vh"}} src={"src/assets/image11.png"}
                             alt={"register-page-image"}/>

                    </div>

                </div>
            </div>
        </div>

    );
}

export default Register;