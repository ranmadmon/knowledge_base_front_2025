import React, {useEffect, useState} from 'react';
import "../CssFiles/Material.css";
import {addToMaterialHistory} from "../../API/MaterialsAPI.jsx";
import * as MaterialsAPI from "../../API/MaterialsAPI.jsx";

function Material() {
    const [material, setMaterial] = useState([]);
    const [courseID, setCourseID] = useState(location.pathname.split("/")[2]);

    async function getMaterials() {
        const response = await MaterialsAPI.getMaterials(courseID)
        setMaterial(response)
    }

    useEffect(() => {
        getMaterials()
    }, []);

    return (
        <div className={"card-container"}>
            {material.length>0 &&
                material.map((item, index) => {
                    return (
                        <div onClick={() => addToMaterialHistory(item.id)} className={"card"} key={index}>
                            <div className="card-content-text">
                                <text className="text1">Title: {item.title}</text>
                                <text className="text2">Description: {item.description}</text>
                                <text>content: {item.content} </text>
                                <text>By: {item.userEntity.username}</text>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    )
}
export default Material;
