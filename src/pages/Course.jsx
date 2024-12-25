import "./Course.css"
import {useState, useEffect} from "react";
import axios from "axios";
import NavBar from "../Components/Dashboard/NavBar.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {getCourse} from "../API/CoursesAPI.jsx";
import Cookies from "universal-cookie";

export default function Course() {
    const navigate = useNavigate();
    const location = useLocation();
    const [courseID, setCourseID] = useState(location.pathname.split("/")[2]);
    const [courseData, setCourseData] = useState({});
    const [material,setMaterial] = useState([]);
    const SERVER_URL = "http://localhost:8080/"
    const [choosenTitle, setChoosenTitle] = useState("");
    const [choosenDescription, setChoosenDescription] = useState("");
    const [choosenContent, setChoosenContent] = useState("");
    const [types, setTypes] = useState([]);
    const [choosenType, setChoosenType] = useState("");
    const [tags, setTags] = useState([]);
    const [choosenTag, setChoosenTag] = useState("");
    const [token,setToken] = useState("FE8C078136ECF7132909C98F53B8131B");
    const [newMaterialVisibility, setNewMaterialVisibility] = useState(false)

    useEffect(() => {
        const cookies = new Cookies(null, { path: '/login' });
        const token = cookies.get("token");
        if (token) {
            setToken(token);
        }
    }, []);

    function addMaterial(){
        axios.get(SERVER_URL+"add-material?title="+choosenTitle+"&type="+choosenType+"&token="+token+"&courseId="+courseID+"&description="+choosenDescription+"&tag="+choosenTag+"&content="+choosenContent)
            .then(
                response=>{
                    getMaterials()
                    setChoosenTitle("")
                    setChoosenDescription("")
                    setChoosenContent("")
                }
            )
    }

    function getTypes(){
        axios.get(SERVER_URL+"get-types")
            .then(
                response=>{
                    if (response.data!==null){
                        setTypes(response.data)
                    }
                })
    }

    function getTags(){
        axios.get(SERVER_URL+"get-tags")
            .then(
                response=>{
                    if (response.data!==null){
                        setTags(response.data)
                    }
                }
            )
    }


    function getMaterials(){
        axios.get(SERVER_URL+"get-materials-by-course-id?courseId="+courseID)
            .then(response => {
                if (response.data) {
                    setMaterial(response.data);
                }
            })
            .catch(error => {
                console.error("Error fetching materials:", error);
            });
    }

    useEffect(() => {
        const fetchData = async () => {
            setCourseData(await getCourse(courseID));
        }
        fetchData()
        getMaterials()
        getTypes()
        getTags()
    }, []);

    function addNewMaterialComponent(){
        return (
            <div className={'add-new-form'}
                 style={newMaterialVisibility ? {transform: "scale(1.01)"} : {transform: "scale(0)"}}>
                <label className={"add-new-form-header"}>Add material</label>
                <br/>
                <input className={"new-form-input"} placeholder={"title"} type={"text"} value={choosenTitle} onChange={(event) => {
                    setChoosenTitle(event.target.value)
                }}/>
                <input className={"new-form-input"} placeholder={"description"} type={"text"} value={choosenDescription} onChange={(event) => {
                    setChoosenDescription(event.target.value)
                }}/>
                <textarea className={"new-form-input-desc"} placeholder={"content"} type={"text"} value={choosenContent} onChange={(event) => {
                    setChoosenContent(event.target.value)
                }}/>
                <select className={"new-form-input-select"} value={choosenType} onChange={(event) => {
                    setChoosenType(event.target.value);console.log(choosenType)
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
    function addToMaterialHistory(materialId){
        axios.get(SERVER_URL+"/add-material-to-history?token="+token+"&materialId="+materialId)

    }
    function materialsComponent(){
        return (
            <div className={"card-container"}>
                {

                    material.map((item, index) => {
                        return (
                            <div onClick={()=>addToMaterialHistory(item.id)} className={"card"} key={index}>
                                <div className="card-content-text">
                                    <text style={{
                                        color: "black",
                                        fontSize: "1.2rem",
                                        fontWeight: "bold",
                                        height: "15%"
                                    }}>Title: {item.title}</text>
                                    <text style={{
                                        color: "black",
                                        fontSize: "1.3rem",
                                        fontWeight: "bold",
                                        height: "85%"
                                    }}>Description: {item.description}</text>
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

    function nothingToShowComponent() {
        return (
            <div className={"nothing-to-show"}>
                <text>Nothing to show here yet 🤷</text>
                <br/>
                <text>Maybe click on the + icon to add a new Material</text>
            </div>
        )
    }
    function handleComponentRendering(){
        if (material.length === 0 && !newMaterialVisibility){
            return nothingToShowComponent()
        } else if (material.length > 0) {
            return materialsComponent()
        }
    }
    return (
        <div className="material-page">
            <div className={"upper-container"} style={{flexDirection: "column"}}>
                <text className={"course-page-header"}>{courseData.name} • {courseData?.lecturerEntity?.name}</text>
                <text className={"course-page-description"}>{courseData.description}</text>

            </div>
            <div className={"lower-container"}>
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