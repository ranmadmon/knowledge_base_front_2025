import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CssFiles/Form.css";
import axios from "axios";
import Error from "./Error.jsx";
import Cookies from "universal-cookie";
import OtpComponent from "./OtpComponent.jsx";
import {
    DASHBOARD_URL,
    ERROR_PASSWORD,
    REGISTER_URL,
    SERVER_URL,
    USER_NOT_EXIST,
} from "../../Utils/Constants.jsx";

export default function Login() {
    // Mode: 'login' or 'forgot'
    const [mode, setMode] = useState("login");
    // Forgot steps: 1=username,2=OTP,3=newPass
    const [forgotStep, setForgotStep] = useState(1);

    // Login state
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorCode, setErrorCode] = useState(-1);
    const [showOtp, setShowOtp] = useState(false);

    // Forgot state
    const [fpUsername, setFpUsername] = useState("");
    const [recovery, setRecovery] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fpMessage, setFpMessage] = useState("");
    const [rpMessage, setRpMessage] = useState("");

    const navigate = useNavigate();

    // Endpoints
    const loginUrl = `${SERVER_URL}/login`;
    const otpUrl = `${SERVER_URL}/check-otp`;
    const forgotUrl = `${SERVER_URL}/forgot-password`;
    const verifyUrl = `${SERVER_URL}/verify-recovery-code`;
    const resetUrl = `${SERVER_URL}/reset-password`;

    // Helpers
    const allFieldsFilled = () =>
        username.length > 2 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password) && /[!@$%^&*_=+\-]/.test(password);

    const showErrorCode = () => {
        if (errorCode === USER_NOT_EXIST) return "User doesn't exist";
        if (errorCode === ERROR_PASSWORD) return "Wrong Password";
        return "Please fill in all fields";
    };

    // Login
    const handleLogin = () => {
        axios.get(loginUrl, { params: { username, password } }).then((resp) => {
            if (!resp.data.success) setErrorCode(resp.data.errorCode);
            else setShowOtp(true);
        });
    };

    const handleOtpSubmit = (otp) => {
        axios.get(otpUrl, { params: { username, password, otp } }).then((resp) => {
            if (resp.data.success) {
                const cookies = new Cookies();
                cookies.set("token", resp.data.token, { path: "/" });
                cookies.set("id", resp.data.id);
                navigate(DASHBOARD_URL);
                window.location.reload();
            } else {
                // Failed OTP
                setShowOtp(true);
            }
        });
    };

    // Forgot password
    const sendTempPassword = () => {
        axios.get(forgotUrl, { params: { username: fpUsername } }).then((resp) => {
            if (resp.data.success) {
                setFpMessage("Code sent to your phone");
                setForgotStep(2);
                setShowOtp(false);
            } else {
                setFpMessage(resp.data.errorCode === USER_NOT_EXIST ? "User not found" : "Error sending code");
            }
        });
    };

    const verifyRecoveryOtp = (otp) => {
        setRecovery(otp);
        axios
            .post(verifyUrl, null, { params: { username: fpUsername, recovery: otp } })
            .then((resp) => {
                if (resp.data.success) {
                    setFpMessage("");
                    setForgotStep(3);
                } else {
                    setFpMessage("Invalid code");
                }
            });
    };

    const resetPasswordFinal = () => {
        if (newPassword !== confirmPassword) {
            setRpMessage("Passwords do not match");
            return;
        }
        axios
            .post(resetUrl, null, { params: { username: fpUsername, newPassword } })
            .then((resp) => {
                if (resp.data.success) {
                    setRpMessage("Password reset!");
                    setTimeout(() => {
                        setMode("login");
                        setForgotStep(1);
                        setRpMessage("");
                    }, 1500);
                } else {
                    setRpMessage("Reset failed");
                }
            });
    };

    // Render Forgot
    if (mode === "forgot") {
        return (
            <div className="flex form-page">
                <div className="flex form-container">
                    <div className="flex left-side">
                        <div className="flex form-headers" style={forgotStep === 1 ? { marginLeft: "20px" } : {}}>
                            <text style={{ fontSize: "1.8rem", fontWeight: "bold" }}>Forgot Password</text>
                        </div>
                        <div className="flex form">
                            {forgotStep === 1 && (
                                <>
                                    <div className="flex input-container">
                                        <label className="form-label">Username:</label>
                                        <input
                                            className="form-input"
                                            value={fpUsername}
                                            onChange={(e) => setFpUsername(e.target.value)}
                                            placeholder="Username"
                                        />
                                    </div>
                                    <div className="submit-container">
                                        <button
                                            id="submit-button"
                                            onClick={sendTempPassword}
                                            className={fpUsername ? "active" : ""}
                                            disabled={!fpUsername}
                                        >
                                            Send Code
                                        </button>
                                        {fpMessage && <p>{fpMessage}</p>}
                                        <button className="have-an-account-button" onClick={() => setMode("login")}>Back to Login</button>
                                    </div>
                                </>
                            )}
                            {forgotStep === 2 && (
                                <OtpComponent
                                    arrayLength={6}
                                    username={fpUsername}
                                    onOtpSubmit={verifyRecoveryOtp}
                                    isVerified={false}
                                    verifiedMessage="Code verified!"
                                    unverifiedMessage="Invalid code, try again."
                                />
                            )}
                            {forgotStep === 3 && (
                                <>
                                    <div className="flex input-container">
                                        <label className="form-label">New Password:</label>
                                        <input
                                            type="password"
                                            className="form-input"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="New Password"
                                        />
                                    </div>
                                    <div className="flex input-container">
                                        <label className="form-label">Confirm Password:</label>
                                        <input
                                            type="password"
                                            className="form-input"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Confirm Password"
                                        />
                                    </div>
                                    <div className="submit-container">
                                        <button
                                            id="submit-button"
                                            onClick={resetPasswordFinal}
                                            className={newPassword && newPassword === confirmPassword ? "active" : ""}
                                            disabled={!newPassword || newPassword !== confirmPassword}
                                        >Reset Password</button>
                                        {rpMessage && <p>{rpMessage}</p>}
                                    </div>
                                </>
                            )}
                            <button className="have-an-account-button" onClick={() => navigate(REGISTER_URL)}>
                                Create an Account
                            </button>
                        </div>
                    </div>
                    <div className="right-side">
                        <div className="image-container">
                            <img
                                className="form-image"
                                style={{ width: "520px", height: "420Px" }}
                                src={"src/assets/icons/math-logo.png"}
                                alt="forgot-password"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Render Login
    return (
        <div className="flex form-page">
            <div className="flex form-container">
                <div className="flex left-side">
                    <div className="flex form-headers">
                        <text style={{ fontSize: "1.8rem", fontWeight: "bold" }}>Login</text>
                    </div>
                    <div className="flex form" id="login">
                        <div className="flex input-container">
                            <label className="form-label">Username:</label>
                            <input
                                className="form-input"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                            />
                        </div>
                        <div className="flex input-container">
                            <label className="form-label">Password:</label>
                            <input
                                type="password"
                                className="form-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            />
                        </div>
                        {errorCode !== -1 && <Error errorMessage={showErrorCode()} />}
                    </div>
                    <div className="submit-container">
                        <button
                            id="submit-button"
                            onClick={handleLogin}
                            className={allFieldsFilled() && errorCode === -1 ? "active" : ""}
                            disabled={!allFieldsFilled() || errorCode !== -1}
                        >
                            Login
                        </button>
                        <button className="forgot-password-button" onClick={() => { setMode("forgot"); setForgotStep(1); }}>
                            Forgot Password?
                        </button>
                        <button className="have-an-account-button" onClick={() => navigate(REGISTER_URL)}>
                            Create an Account
                        </button>
                    </div>
                </div>
                <div className="right-side">
                    <div className="image-container">
                        <img
                            className="form-image"
                            style={{ width: "520px", height: "420Px" }}
                            src={"src/assets/icons/math-logo.png"}
                            alt="login-page-image"
                        />
                    </div>
                </div>
            </div>
            {showOtp && (
                <OtpComponent
                    arrayLength={6}
                    username={mode === "login" ? username : fpUsername}
                    onOtpSubmit={mode === "login" ? handleOtpSubmit : verifyRecoveryOtp}
                    isVerified={false}
                    verifiedMessage={mode === "login" ? "Login successful! Redirecting..." : "Code verified!"}
                    unverifiedMessage="Invalid code, try again."
                />
            )}
        </div>
    );
}
