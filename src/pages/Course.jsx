import "./Course.css"
import React, {useState,useEffect} from "react";
import Material from "../Components/CoursesPage/Material.jsx";
import * as MaterialsAPI from "../API/MaterialsAPI.jsx";
import DragNDrop from "../Components/DragNDrop.jsx";
import {Box} from "@mui/material";
import {useLocation} from "react-router-dom";

export default function Course() {
  const location = useLocation();
    const [material, setMaterial] = useState([]);
    const [uploadFileActive,setUploadFileActive ]= useState(false)
    const [courseID, setCourseID] = useState(location.pathname.split("/")[2]);
    const [chosenTitle, setChosenTitle] = useState("");
    const [choosenDescription, setChoosenDescription] = useState("");
    const [choosenContent, setChoosenContent] = useState("");
    const [types, setTypes] = useState([]);
    const [choosenType, setChoosenType] = useState("");
    const [tags, setTags] = useState([]);
    const [choosenTag, setChoosenTag] = useState("");
    const [newMaterialVisibility, setNewMaterialVisibility] = useState(false)
    const [courseData, setCourseData] = useState({});
    const [materialId,setMaterialId]=useState()

    async function getMaterials() {
        const response = await MaterialsAPI.getMaterials(courseID)
        setMaterial(response)
    }
 useEffect(() => {
        getTypes()
        getTags()
        getMaterials()
    }, [])

 function addNewMaterialComponent() {
        return (
            <div className={'add-new-form'}
                 style={newMaterialVisibility ? {transform: "scale(1.01)"} : {transform: "scale(0)"}}>
                <label className={"add-new-form-header"}>Add material</label>
                <br/>
                <input className={"new-form-input"} placeholder={"title"} type={"text"} value={chosenTitle}
                       onChange={(event) => {
                           setChosenTitle(event.target.value)
                       }}/>
                <input className={"new-form-input"} placeholder={"description"} type={"text"} value={choosenDescription}
                       onChange={(event) => {
                           setChoosenDescription(event.target.value)
                       }}/>
                <textarea className={"new-form-input-desc"} placeholder={"content"} type={"text"} value={choosenContent}
                          onChange={(event) => {
                              setChoosenContent(event.target.value)
                          }}/>
                <select className={"new-form-input-select"} value={choosenType} onChange={(event) => {
                    setChoosenType(event.target.value);
                    console.log(choosenType)
                }}>
                    <option value="" disabled>Choose type</option>
                    {types.map((type) => {
                        return (
                            <option key={type.id} value={type.id}>{type.name}</option>
                        )
                    })}
                </select>
                <select className={"new-form-input-select"} value={choosenTag} onChange={(event) => {
                    setChoosenTag(event.target.value);
                }}>
                    <option value={""} disabled>Choose tag</option>
                    {
                        tags.map((tag) => {
                            return (
                                <option key={tag.id} value={tag.id}>{tag.name}</option>
                            )
                        })
                    }
                </select>
                <button className={"new-form-button"} onClick={() => addMaterial()}>Add Material</button>

            </div>
        )
    }

    async function addMaterial() {
       const response = await MaterialsAPI.addMaterial(chosenTitle, choosenType, courseID, choosenDescription, choosenTag, choosenContent);
      await setMaterialId(response);
        await getMaterials()
        setUploadFileActive(true)
        setChosenTitle("")
        setChoosenDescription("")
        setChoosenContent("")
        setNewMaterialVisibility(false)
    }
    async function getTypes() {
        const response = await MaterialsAPI.getTypes()
        setTypes(response)
    }

    async function getTags() {
        const response = await MaterialsAPI.getTags()
        setTags(response)
    }


    function handleComponentRendering() {

            return <Material />

    }

    return (
        <div className="material-page">
            <div className={"upper-container"} style={{flexDirection: "column"}}>
                <text className={"course-page-header"}>{courseData.name} • {courseData?.lecturerEntity?.name}</text>
                <text className={"course-page-description"}>{courseData.description}</text>

            </div>
            <div className={"lower-container"}>
                {uploadFileActive && <Box  maxWidth={"60%"} minWidth={"60%"} alignSelf={"center"}>
                    <DragNDrop id={materialId}/>
                </Box>}
                <div className={"card-container"}>
                    {handleComponentRendering()}
                    <button className={"add-new"}
                            onClick={() => setNewMaterialVisibility(!newMaterialVisibility)}>
                        <svg aria-expanded={newMaterialVisibility} xmlns="http://www.w3.org/2000/svg" className="plus"
                             viewBox="0 0 160 160" width="35" fill={"var(--color-scheme)"}>
                            <rect className="vertical-line" x="70" width="20" height="160"/>
                            <rect className="horizontal-line" y="70" width="160" height="20"/>
                        </svg>
                    </button>
                </div>
                {newMaterialVisibility && addNewMaterialComponent()}
            </div>

        </div>
    )
}