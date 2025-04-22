import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CssFiles/UserDetails.css";
import Cookies from "universal-cookie";
import NotificationUserDetails from "./NotificationUserDetalis.jsx";

const cookies = new Cookies();
const token = cookies.get("token");

function UserDetails() {
    const [userDetails, setUserDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [notification, setNotification] = useState({ message: "", type: "" });
    const [editingField, setEditingField] = useState(null);
    const [tempValue, setTempValue] = useState("");

    const fetchUserDetails = async () => {
        try {
            const response = await axios.get("http://localhost:8080/user-details", { params: { token } });
            if (response.data.success) {
                setUserDetails(response.data);
            } else {
                setNotification({ message: response.data.message || "Failed to fetch user details.", type: "error" });
            }
        } catch (err) {
            setNotification({ message: "An error occurred while fetching user details.", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const handleUpdate = async (field) => {
        const endpointMap = {
            username: "change-username",
            firstName: "change-first-name",
            lastName: "change-last-name",
            email: "change-email",
            phoneNumber: "change-phone-number",
        };

        const payload = {
            token,
        };

        payload[
            field === "username" ? "newUsername" :
                field === "firstName" ? "newFirstName" :
                    field === "lastName" ? "newLastName" :
                        field === "email" ? "newEmail" :
                            field === "phoneNumber" ? "phoneNumber" : null
            ] = tempValue;

        try {
            const response = await axios.post(
                `http://localhost:8080/${endpointMap[field]}`,
                payload,
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.data.success) {
                setNotification({ message: response.data.message || `${field} updated successfully.`, type: "success" });
                fetchUserDetails();
            } else {
                setNotification({ message: response.data.message || `${field} update failed.`, type: "error" });
            }
        } catch (error) {
            setNotification({ message: "An error occurred. Please try again.", type: "error" });
        } finally {
            setEditingField(null);
        }
    };

    if (loading) return <p>Loading user details...</p>;

    return (
        <div className="user-details-container">
            <NotificationUserDetails
                message={notification.message}
                type={notification.type}
                onClose={() => setNotification({ message: "", type: "" })}
            />
            <div className="user-details-side">
                <h2>Current Details</h2>
                <ul>
                    {Object.entries(userDetails)
                        .filter(([key]) => key !== "success" && key !== "message") // מסנן את success ו-message
                        .map(([key, value]) => (
                            <li key={key}>
                                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                            </li>
                        ))}
                </ul>
            </div>
            <div className="user-details-main">
                <h1>Update Your Details</h1>
                <div className="user-details-form">
                    {["username", "firstName", "lastName", "email", "phoneNumber"].map((field) => (
                        <div key={field} className="user-details-field">
                            <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                            {editingField === field ? (
                                <div className="edit-container">
                                    <input
                                        type="text"
                                        value={tempValue}
                                        onChange={(e) => setTempValue(e.target.value)}
                                    />
                                    <button onClick={() => handleUpdate(field)}>Save</button>
                                    <button onClick={() => setEditingField(null)}>Cancel</button>
                                </div>
                            ) : (
                                <div className="display-container">
                                    <span>{userDetails[field]}</span>
                                    <button
                                        onClick={() => {
                                            setEditingField(field);
                                            setTempValue(userDetails[field]);
                                        }}
                                    >
                                        Edit
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default UserDetails;
