import "./Course.css"
import {useState, useEffect} from "react";
import axios from "axios";
import NavBar from "../Components/Dashboard/NavBar.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {getCourse} from "../API/CoursesAPI.jsx";

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


    //TODO  לבקש משי ללמד אותנו use contex
    function addMaterial(){
        axios.get(SERVER_URL+"add-material?title="+choosenTitle+"&type="+choosenType+"&username="+"shaig123"+"&token="+"E10ADC3949BA59ABBE56E057F20F883E"+"&courseId="+courseID+"&description="+choosenDescription+"&tag="+choosenTag+"&content="+choosenContent)
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
    return (
        <div className="course-material">
            <h1>
                {courseData.name + "  " }
            </h1>
            <h2>{ courseData.description + "  by:" + courseData?.lecturerEntity?.name}</h2>
            <div>
                {
                    material.length > 0 && (
                        <div >
                            {
                                material.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <div><bold>title: </bold>{item.title}</div>
                                            <div><bold>description:</bold> {item.description}</div>
                                            <div><bold>user who uploaded the material:</bold> {item.userEntity.username}</div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    )
                }
            </div>
              <div>
                  <h1>Add material</h1>
                  <br/>
                  <input placeholder={"title"} type={"text"} value={choosenTitle} onChange={(event)=>{setChoosenTitle(event.target.value)}}/>
                  <input placeholder={"description"} type={"text"} value={choosenDescription} onChange={(event)=>{setChoosenDescription(event.target.value)}}/>
                  <input placeholder={"content"} type={"text"} value={choosenContent} onChange={(event)=>{setChoosenContent(event.target.value)}}/>
                  <select value={choosenType} onChange={(event)=>{setChoosenType(event.target.value)}} >
                      <option value="" disabled>Choose type</option>
                      {types.map((type,index)=>{
                          return(
                              <option key={index} value={type.name}>{type.name}</option>
                          )
                      })}
                  </select>
                  <select value={choosenTag} onChange={(event)=>{setChoosenTag(event.target.value )}}>
                      <option value={""}>Choose tag</option>
                      {
                          tags.map((tag,index)=>{
                              return(
                                  <option key={index} value={tag.name}>{tag.name}</option>
                              )
                          })
                      }
                  </select>
              </div>
            <button onClick={()=>addMaterial()}>Add Material</button>
            <div>
                <button onClick={() => navigate("/courses-list")}>GO-BACK</button>
            </div>
        </div>
    )
}