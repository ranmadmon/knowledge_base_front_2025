import React, { useEffect } from "react";
import "../CssFiles/NotificationUserDetalis.css";

const NotificationUserDetails = ({ message, type, onClose }) => {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000); // 2000 מילי שניות = 2 שניות

            return () => clearTimeout(timer); // ניקוי הטיימר אם הרכיב מוסר
        }
    }, [message, onClose]);

    if (!message) return null;

    return (
        <div className={`notification ${type}`}>
            <p>{message}</p>
            <button onClick={onClose}>X</button>
        </div>
    );
};

export default NotificationUserDetails;
