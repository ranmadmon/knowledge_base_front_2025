import React, {useEffect, useState} from "react";
import ListCard from "./ListCard.jsx";
import {getMaterialsHistory} from "../../API/MaterialsAPI.jsx";
import Table from "./Table.jsx";
import formatDatetime from "../../Utils/formatDatetime.js";

function LastActivities() {
    const [LastActivitiesList, setLastActivitiesList] = useState([]);

    const [columnDefs, setColumnDefs] = useState([
        {field: "title",headerName:"name", filter: true,},
        {field: "description",headerName:"lecturer", filter: true},
        {field: "content",headerName:"course", filter: true},
        {field: "uploadDate",headerName:"date", filter: true, cellDataType: 'dateString'}

    ]);

    useEffect(() => {

        const fetchData = async () => {
            setLastActivitiesList(await getMaterialsHistory());
        }
        fetchData()

    }, []);

    function renderCourseList(lastActivitiesList) {
        const formattedList = lastActivitiesList.map((item) => ({
            ...item,
            uploadDate:  formatDatetime(item.uploadDate)
        }));
        return (
            <div>
                <Table  column={ columnDefs} row={formattedList}/>
            </div>
        )
    }

    return (
        <>
            <ListCard render={renderCourseList} perPage={6} list={LastActivitiesList} header={"Last Activities"} />
        </>
    )
}

export default LastActivities;