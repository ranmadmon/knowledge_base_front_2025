import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Register.css';
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
        axios.get(SERVER_URL+"/register?userName="+username + "&password=" + password
            +"&name="+name+ "&lastName="+lastName+"&email=" + email +"&role="+ jobTitle)
            .then(response => {
                if (response.data.success){
                    if (!response.data.registeredSuccessfully){
                        setErrorCode(USERNAME_NOT_AVAILABLE)
                    }else{
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
            <div key={title}>
                <label>{title}:</label>
                <input
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
        <div>
            <h2>Register Page</h2>
            <div className="register-form">
                <form onSubmit={handleRegister}>
                    {/* Form fields using getInput */}
                    {getInput("Name", name, setName)}
                    {getInput("Last Name", lastName, setLastName)}
                    {getInput("Username", username, setUsername)}
                    {getInput("Password", password, setPassword, "password")}
                    {getInput("Password Confirm", passwordConfirm, setPasswordConfirm, "password")}
                    {getInput("Email", email, setEmail, "email")}
                    <div>
                        <label>Job Title:</label>
                        <select value={jobTitle} onChange={(e) => setJobTitle(e.target.value)}>
                            <option value="" disabled>Select Job Title</option>
                            <option value="Student">Student</option>
                            <option value="Crew">Crew</option>
                        </select>
                    </div>

                    <button type="submit"
                            className={allFieldsFilled() ? "active" : ""}
                            disabled={!allFieldsFilled()}>
                        Register
                    </button>

                    <label> {showErrorCode()}</label>
                </form>
            </div>
        </div>

    );
}

export default Register;