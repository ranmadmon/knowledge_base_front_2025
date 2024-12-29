import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Form.css';
import axios from "axios";
import {teal} from "@mui/material/colors";
import OtpComponent from "./OtpComponent.jsx";
import {LOGIN_URL} from "../Utils/Constants.jsx";
import Error from "../Components/General/Error/Error.jsx";

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
    const regexString = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+\\-]).{8,12}";
    const regex = new RegExp(regexString);

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

    function getInput(title, value, setValue, type, pattern, requirementMessage,error, message, setError) {
        return (
            <div className={"flex input-container"} key={title}>
                <label className={"form-label"}>{title}:{errorCodeComponent(error, message)}</label>
                <div style={{display: "flex", width: "100%"}}>
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
                           onChange={(e) => (
                               setValue(e.target.value)
                           )}
                           onKeyDown={((e) => {
                               setError(null)
                               checkValidity(title, message)
                           })}
                           placeholder={title}
                           size={1}
                           aria-expanded={false}
                        // onInvalid={(e) => {
                        //     e.target.setCustomValidity("shit")
                        // }}
                    />
                    <text className={"requirement-message"}>{requirementMessage}</text>
                </div>
            </div>
        );
    }

    const handleRegex = (type) => {
        let regex = ""
        switch (type) {
            case "firstname": regex = "^(?=.*[a-z]).{3,}$"; break;
            case "lastname": regex = "^(?=.*[a-z]).{3,}$"; break;
            case "phone": regex = "^05\d{8}$"; break;
            case "email": regex = "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"; break;
            case "password": regex = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+\\-]).{8,}'; break;
            case "username":  regex = "^[a-z0-9._%+-].{6,12}$"; break;
            case "confirm-password": regex = password;break;
        }
        return regex
    }
    const handleRequirementMessage=(type)=>{
        let requirementMessage = ""
        switch (type) {
            case "firstname": requirementMessage = "Requirement: minimum characters for first name is 3 characters"; break;
            case "lastname": requirementMessage = "Requirement: minimum characters for last name is 3 characters"; break;
            case "phone": requirementMessage = "Requirement: Phone number should be of pattern 05XXXXXXXX "; break;
            case "email": requirementMessage = "Requirement: Email address should be of pattern example@example.com"; break;
            case "password": requirementMessage = "Requirement: Password should have a minimum of 8 characters, lowercase letters [a-z], uppercase letters [A-Z], numbers [0-9] and motherfucking special characters [!@$%]"+'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@$%]).{8,}'; break;
            case "username":  requirementMessage = "Requirement: Username should be at least 6 characters long and have both letters [a-z] and numbers [0-9]"; break;
            case "confirm-password": requirementMessage = "Requirement: Confirm password should be exactly like the Password you chose";break;
        }
        return requirementMessage
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
                            {getInput("Name", name, setName, "text",handleRegex("firstname"),handleRequirementMessage("firstname"))}
                            {getInput("Last Name", lastName, setLastName, "text",handleRegex("lastname"),handleRequirementMessage("lastname"))}
                        </div>
                        <div className={"input-pair"}>
                            {getInput("Email", email, setEmail, "email", handleRegex("email"),handleRequirementMessage("email"),emailErrorCode, "email is taken", setEmailErrorCode)}

                            {getInput("Phone", phoneNumber, setPhoneNumber, "tel",handleRegex("phone"),handleRequirementMessage("phone"), phoneErrorCode, "phone is taken", setPhoneErrorCode)}
                        </div>
                        <div className="input-pair">
                            {getInput("Username", username, setUsername, "username",handleRegex("username"),handleRequirementMessage("username"),usernameErrorCode, "username is taken", setUsernameErrorCode)}

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
                            {getInput("Password", password, setPassword, "password", handleRegex("password"),handleRequirementMessage("password"))}
                            {getInput("Confirm Password", passwordConfirm, setPasswordConfirm, "password",handleRegex("confirm-password"),handleRequirementMessage("confirm-password"),passwordErrorCode, "the passwords don't match")}
                        </div>
                    </div>
                    <div className={"submit-container"}>
                        {errorCode !== -1 && <Error errorMessage={showErrorCode()}/> }
                        <div className={"input-pair"}>
                            <button onClick={() => register()} id={"submit-button"}
                                    className={allFieldsFilled()&&errorCode===-1 ? "active" : ""}
                                    disabled={!allFieldsFilled()||errorCode!==-1}>
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