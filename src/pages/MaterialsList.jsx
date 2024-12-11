// CourseMaterials.jsx
import { useState, useEffect } from "react";
import axios from "axios";

export default function CourseMaterials( courseId ) {
    const [materials, setMaterials] = useState([]);
    const SERVER_URL = "http://localhost:8080"; // כתובת השרת שלך


    useEffect(() => {
        // קריאת API כדי להביא את החומרים של הקורס
        axios.get(`${SERVER_URL}/get-course-materials/${courseId}`)
            .then(response => {
                if (response.data) {
                    setMaterials(response.data);
                }
            })
            .catch(error => {
                console.error("Error fetching course materials", error);
            });
    }, [courseId]);

    return (
        <div>
            <h2>Course Materials</h2>
            {materials.length === 0 ? (
                <p>No materials available for this course.</p>
            ) : (
                <ul>
                    {materials.map((material, index) => (
                        <li key={index}>{material.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}
