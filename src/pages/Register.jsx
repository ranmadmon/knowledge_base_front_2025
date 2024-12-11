import {useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import './Form.css';
import axios from "axios";

function Register() {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [revealPassword, setRevealPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [errorCode, setErrorCode]= useState(-1);
    const formRef = useRef(null);
    const navigate = useNavigate();

    const SERVER_URL = "http://localhost:8080"
    const INVALID_REPEAT_PASSWORD = 102;
    const FORM_INVALID = 101;
    const USERNAME_NOT_AVAILABLE = 103

    function register(){
        console.log("rrrrr")

        axios.get("http://localhost:8080/register?userName="+username+"&password="+password+"&name="+name+"&lastName="+lastName+"&email="+email+"&role="+jobTitle+"&phoneNumber="+phone)
            .then(response => {
                if (response.data.success){
                    if (!response.data.registeredSuccessfully){
                        setErrorCode(USERNAME_NOT_AVAILABLE)
                    }else{
                        console.log(response.data)
                        navigate("/codeInputComponent", { state: { userName: username, password: password ,type:"register"} });
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
    function getInput(title, value, setValue, type, minLengthRequirement) {
        return (
            <div className={"input-container"} key={title}>
                <label className={"form-label"}>{title}:</label>
                <input required
                       className={"form-input"}
                       type={type}
                       value={value}
                       onChange={(e) => setValue(e.target.value)}
                       placeholder={title}
                       minLength={minLengthRequirement}
                       size={1}
                       pattern={(type==="tel")&&"[0-9]{3}-[0-9]{3}[0-9]{4}"}
                />
            </div>
        );
    }

    function handleRegister(event) {
        event.preventDefault(); // מונע רענון של הדף
        const isFormValid = formRef.current.checkValidity();
        if(isFormValid){
            if (password !== passwordConfirm) {
                setErrorCode(INVALID_REPEAT_PASSWORD);
            } else {
                register();
            }
        } else {
            setErrorCode(FORM_INVALID);
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
                        <text style={{fontSize: "2.4rem", fontWeight: "bold"}}>Register</text>
                        <text style={{fontSize: "1.5rem", fontWeight: "bold"}}>Thank you for joining us 🫡</text>
                    </div>

                    <form className={"form register"} onSubmit={handleRegister}>
                        <label onClick={handleRevealPassword}> {showErrorCode()}</label>
                        {/* Form fields using getInput */}
                        <div className="input-pair">
                            {getInput("Name", name, setName, "text", 0)}
                            {getInput("Last Name", lastName, setLastName, "text", 0)}
                        </div>
                        <div className={"input-pair"}>
                            {getInput("Email", email, setEmail, "email", 0)}
                            {getInput("Phone", phone, setPhone, "tel", 0)}
                        </div>
                        <div className="input-pair">
                            {getInput("Username", username, setUsername, "text", 5)}
                            <div className={"input-container"}>
                                <label className={"form-label"}>Job Title:</label>
                                <select required className={"form-input"} value={jobTitle}
                                        onChange={(e) => setJobTitle(e.target.value)}>
                                    <option value="" disabled>Select Job Title</option>
                                    <option value="Student">Student</option>
                                    <option value="Lecturer">Lecturer</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                        </div>
                        <div className="input-pair">
                            {getInput("Password", password, setPassword, "password", 8)}
                            {getInput("Password Confirm", passwordConfirm, setPasswordConfirm, "password", 8)}
                        </div>
                    </form>
                    <div className={"submit-container"}>
                        <button id={"submit-button"} type="submit"
                                className={allFieldsFilled() ? "active" : ""}
                                disabled={!allFieldsFilled()}>
                            Register Now
                        </button>
                        <div className={"have-an-account"}>
                            <label>Already have an account?</label>
                            <button className={"have-an-account-button"} onClick={() => navigate('/')}> Login Now!
                            </button>
                        </div>
                    </div>
                </div>
                <div className={"left-side"}>
                    <div className={"image-container"}>
                        <img className={"form-image"} style={{width: "500px", height: "500px"}}
                             src={"src/assets/image11.png"}
                             alt={"register-page-image"}/>
                    </div>

                </div>
            </div>
        </div>

    );
}

export default Register;