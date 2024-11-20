import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Register.css';

function Register() {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [email, setEmail] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const navigate = useNavigate();

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
            alert("Passwords do not match!");
        } else {
            alert("Registration successful");
            navigate("/login");
        }
    }


    return (
        <div className="register-form">
            <h2>Register Page</h2>
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

                <button type="submit" className={allFieldsFilled() ? "active" : ""} disabled={!allFieldsFilled()}>
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;

