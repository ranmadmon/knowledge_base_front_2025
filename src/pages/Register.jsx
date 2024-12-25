import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Form.css';
import axios from "axios";
import {teal} from "@mui/material/colors";
import OtpComponent from "./OtpComponent.jsx";
import {LOGIN_URL} from "../Utils/Constants.jsx";

function Register() {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showOtpComponent,setShowOtpComponent] = useState(false);
    const [email, setEmail] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [errorCode, setErrorCode]= useState(-1);
    const [phoneNumber,setPhoneNumber] = useState("")

    const navigate = useNavigate();

    const [usernameErrorCode, setUsernameErrorCode] = useState(null);
    const [phoneErrorCode, setPhoneErrorCode] = useState(null);
    const [emailErrorCode, setEmailErrorCode] = useState(null);
    const [passwordErrorCode, setPasswordErrorCode] = useState(null);

    const SERVER_URL = "http://localhost:8080"
    const USERNAME_TAKEN = 1001;
    const PHONE_TAKEN = 1002;
    const EMAIL_TAKEN = 1003;
    const INVALID_REPEAT_PASSWORD = 1004;


    function register(){
        axios.get("http://localhost:8080/register?userName="+username+"&password="+password+"&name="+name+"&lastName="+lastName+"&email="+email+"&role="+jobTitle+"&phoneNumber="+phoneNumber)
            .then(response=>{
                console.log(response.data)
                if (response.data!=null){
                    if (!response.data.success){
                        console.log(response.data)
                        setEmailErrorCode(response.data.emailTaken)
                        setUsernameErrorCode(response.data.usernameTaken)
                        setPhoneErrorCode(response.data.phoneTaken)
                    }else {
                        console.log("ok")
                        setShowOtpComponent(true);
                    }
                }
            })
    }
    const onOtpSubmit = (otp) => {
        axios.get("http://localhost:8080/check-otp-to-register?username="+username+"&otp="+otp)
            .then(response => {
                if (response.data.success){
                    if (!response.data.registeredSuccessfully){
                        alert("הקוד לא תקין נסה שוב")
                    }else{
                        setShowOtpComponent(false);
                        console.log(response.data)
                        navigate(LOGIN_URL);
                    }
                }
            })
    }
    const allFieldsFilled = () => {
        return (
            name.length>2 &&
            lastName.length>2 &&
            username.length>4 &&
            (
                /[A-Z]/.test(password) &&
                /[a-z]/.test(password) &&
                /[0-9]/.test(password) &&
                /[!@#$%^&*_=+-]/.test(password)
            )&&
            password.length>7&&
            passwordConfirm===password &&
            email.trim()&&
            emailErrorCode===null&&
            phoneErrorCode===null&&
            usernameErrorCode===null&&
            jobTitle.trim()
        );
    };

    function getInput(title, value, setValue, type, pattern, error, message, setError) {
        return (
            <div className={"flex input-container"} key={title}>
                <label className={"form-label"}>{title}:{errorCodeComponent(error,message)}</label>
                <div style={{ display: "flex", width:"100%" }}>
                    {type === "password" &&
                        <button className={"show-password"}
                                style={{}}
                                onClick={(event) => {
                                    title === "Password" ? handleShowPassword(event) : handleShowConfirmPassword(event)
                                }}></button>
                    }
                    <input required
                           className={"form-input"}
                           id={title}
                           type={type}
                           name={title}
                           value={value}
                           pattern={pattern}
                           onChange={(e) => {
                               setValue(e.target.value);
                               // setError("");
                               checkValidity(title,message)}}
                           placeholder={title}
                           size={1}
                           aria-expanded={false}
                           // onInvalid={(e) => {
                           //     e.target.setCustomValidity("shit")
                           // }}

                    />
                </div>
            </div>
        );
    }
    function checkValidity(title,message){
        let form = document.getElementById(title);
        if (!form.checkValidity()){
            form.setCustomValidity(message)
            console.log(form.checkValidity());
        } else{
            form.setCustomValidity()
            console.log(form.reportValidity());
        }
    }
    function showErrorCode() {
        let errorMessage = "";
        switch (errorCode){
            case -1 : errorMessage = "Please fill in all fields"; break;
            case  USERNAME_TAKEN :errorMessage = "username not available";break;
            case  PHONE_TAKEN :errorMessage = "phone-number not available";break;
            case  EMAIL_TAKEN :errorMessage = "email is not available";break;
            case  INVALID_REPEAT_PASSWORD : errorMessage ="Invalid repeat password ";break;
        }
        return errorMessage;
    }
    function handleShowPassword(event){
        setShowPassword(!showPassword);
        let input = event.target.closest("div").lastChild
        console.log(input)
        if (showPassword) {
            event.currentTarget.style.backgroundImage = 'url("src/assets/form/hide_password.png")';
            input.setAttribute("type", "text");
        } else{
            event.currentTarget.style.backgroundImage = 'url("src/assets/form/show_password.png")';
            input.setAttribute("type", "password");
        }
    }
    function handleShowConfirmPassword(event){
        setShowConfirmPassword(!showConfirmPassword);
        let input = event.target.closest("div").lastChild
        if (showConfirmPassword) {
            event.currentTarget.style.backgroundImage = 'url("src/assets/form/hide_password.png")';
            input.setAttribute("type", "text");
        } else {
            event.currentTarget.style.backgroundImage = 'url("src/assets/form/show_password.png")';
            input.setAttribute("type", "password");
        }
    }
    function errorCodeComponent(error, message){
        return(
            <>
                {error!==null&&
                    (<label style={{ color: "red", marginTop: "5px" }}>
                            {message}
                        </label>
                    )}
            </>
        )
    }
    function passwordRequirementsComponent(){
        return (
            <div className={"password-requirement-bubble"}>
                <label className={"password-tooltip"}>password should include: A-Z, a-z, 1-9,*/
                    "length>8"</label>
            </div>
        )
    }

    return (
        <div className="flex form-page">
            <button onClick={()=>{
                checkValidity("Email")
            }}>check valid</button>
            <div className="flex form-container">
                <div className={"flex left-side"}>
                    <div className={"flex form-headers"}>
                        <img style={{width: "50px", height: "50px"}} src={"src/assets/book-logo.PNG"} alt={"logo"}/>
                        <text style={{fontSize: "1.8rem", fontWeight: "bold"}}>Register</text>
                        <text style={{fontSize: "1.2rem", fontWeight: "bold"}}>Thank you for joining us 🫡</text>
                    </div>

                    <div className={"flex form"}>
                        {/*<text>{showErrorCode()}</text>*/}
                        {/* Form fields using getInput */}
                        <div className="input-pair">
                            {getInput("Name", name, setName, "text","^(?=.*[a-z]).{3,}$")}
                            {getInput("Last Name", lastName, setLastName, "text","^(?=.*[a-z]).{3,}$")}
                        </div>
                        <div className={"input-pair"}>
                            {getInput("Email", email, setEmail, "email", "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$",emailErrorCode, "email is taken", setEmailErrorCode)}

                            {getInput("Phone", phoneNumber, setPhoneNumber, "tel","^05\\d{8}$", phoneErrorCode, "phone is taken", setPhoneErrorCode)}
                        </div>
                        <div className="input-pair">
                            {getInput("Username", username, setUsername, "username","(?=.*[a-z]).{6,12}$" ,usernameErrorCode, "username is taken", setUsernameErrorCode)}

                            <div className={"flex input-container"}>

                                <label className={"form-label"}>Job Title:</label>
                                <div style={{display: "flex", width: "100%"}}>

                                    <select required className={"form-input"} value={jobTitle}
                                            onChange={(e) => setJobTitle(e.target.value)}>
                                        <option value="" disabled>Select Job Title</option>
                                        <option value="Student">Student</option>
                                        <option value="Lecturer">Lecturer</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="input-pair">
                            {getInput("Password", password, setPassword, "password", "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$")}
                            {getInput("Confirm Password", passwordConfirm, setPasswordConfirm, "password", "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$",passwordErrorCode, "the passwords don't match")}
                        </div>
                    </div>
                    <div className={"submit-container"}>
                        <div className={"input-pair"}>
                            <button onClick={() => register()} id={"submit-button"}
                                    className={allFieldsFilled() ? "active" : ""}
                                    disabled={!allFieldsFilled()}>
                                Register Now
                            </button>
                            <div className={"have-an-account"}>
                                <label>Already have an account?</label>
                                <button className={"have-an-account-button"} onClick={() => navigate(LOGIN_URL)}> Login
                                    Now!
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
                <div className={"right-side"}>
                    <div className={"image-container"}>
                        <img className={"form-image"} style={{width: "500px", height: "500px"}}
                             src={"src/assets/image11.png"}
                             alt={"register-page-image"}/>
                    </div>

                </div>
            </div>
            {showOtpComponent && <OtpComponent length={6} username={username} onOtpSubmit={onOtpSubmit}/>}
        </div>

    );
}

export default Register;