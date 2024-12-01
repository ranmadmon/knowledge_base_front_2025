import React, {useEffect, useState} from "react";
import ListCard from "./ListCard.jsx";
import {getMaterials} from "../../API/MaterialsAPI.jsx";

function LastActivities() {
    const [LastActivitiesList, setLastActivitiesList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLastActivitiesList(await getMaterials());
        }
        fetchData()
    }, []);
    function renderCourseList(coursesList) {
        return (
            <ul>
                {coursesList.map((activity) => (
                    <li key={activity.id}>
                        <h3>{activity.title} - by: {activity?.userEntity?.username}</h3>
                        <h3> {activity.description} </h3>
                        <h3>posted: {activity.uploadDate} </h3>

                    </li>
                ))}
            </ul>
        )
    }

    return (
        <>
            <ListCard render={renderCourseList} perPage={6} list={LastActivitiesList} header={"Last Activities"} />
        </>
    )
}



export default LastActivities;