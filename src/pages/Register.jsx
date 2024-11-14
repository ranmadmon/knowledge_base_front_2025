import { useState } from "react";
import {useNavigate} from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [email, setEmail] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const navigate = useNavigate();

    function getInput(title, value, setValue, type = "text") {
        return (
            <div>
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

    function handleRegister() {
        if (password !== passwordConfirm) {
            alert("Passwords do not match!");
        } else {
            // כאן ניתן להוסיף את הקוד לביצוע הרישום, כמו שליחת הנתונים לשרת
            alert("Registration successful");
            navigate("/login");
        }
    }

    return (
        <div>
            <h2>Register Page</h2>
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
            <button onClick={handleRegister}>Register</button>
            <button onClick={() => navigate('/login')}>Login Page</button>
        </div>
    );
}

export default Register;
