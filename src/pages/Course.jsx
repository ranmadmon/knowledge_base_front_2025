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
    const [types, setTypes] = useState([]);
    const [choosenType, setChoosenType] = useState("");
    const [tags, setTags] = useState([]);
    const [choosenTag, setChoosenTag] = useState("");

    // /get-materials-by-course-id

    function getTypes(){
        axios.get(SERVER_URL+"get-types")
            .then(
                response=>{
                    console.log("response.data")
                    if (response.data!==null){
                        console.log(response.data)
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
                  <input placeholder={"title"} type={"text"}/>
                  <input placeholder={"description"} type={"text"}/>
                  <input placeholder={"content"} type={"text"}/>
                  <select value={choosenType} >
                      <option value="" disabled>Choose type</option>
                      {types.map((type,index)=>{
                          return(
                              <option key={index} value={type.name}>{type.name}</option>
                          )
                      })}
                  </select>
                  <select value={choosenTag}>
                      <option value={""}>Choose tag</option>
                      {
                          tags.map((tag,index)=>{
                              return(
                                  <option key={index} value={tag}>{tag.name}</option>
                              )
                          })
                      }
                  </select>
              </div>
            <div>
                <button onClick={() => navigate("/courses-list")}>GO-BACK</button>
            </div>
        </div>
    )
}