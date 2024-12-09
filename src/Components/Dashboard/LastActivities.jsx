import React, {useEffect, useState} from "react";
import ListCard from "./ListCard.jsx";
import {getMaterials} from "../../API/MaterialsAPI.jsx";
import Table from "./Table.jsx";

function LastActivities() {
    const [LastActivitiesList, setLastActivitiesList] = useState([]);

    const [columnDefs, setColumnDefs] = useState([
        {
            field: "name", filter: true, cellEditor: 'agLargeTextCellEditor',

            cellEditorPopup: true, editable: true, cellEditorParams: {
                rows: 15,
                cols: 60

            }
        },
        {field: "content", filter: true},
        {field: "course", filter: true},
        {field: "date", filter: true, cellDataType: 'date'}

    ]);

    const [rowData, setRowData] = useState([
        {make: "Tesla", name: "lol", content: 64950, date: new Date(2024, 2 - 1, 1)},
        {make: "Ford", name: "F-Series", content: 33850, date: new Date(2024, 2 - 1, 1)},
        {make: "Toyota", name: "Corolla", content: 29600, date: new Date(2024, 2 - 1, 1)},
        {make: "Mercedes", name: "EQA", content: 48890,date: new Date(2024, 2 - 1, 1)},
        {make: "Fiat", name: "500", content: 15774, date: new Date(2024, 2 - 1, 1)},
        {make: "Nissan", name: "Juke", content: 20675, date: new Date(2024, 2 - 1, 1)},
    ]);

    useEffect(() => {
        const fetchData = async () => {
            setLastActivitiesList(await getMaterials());
        }
        fetchData()
    }, []);
    function renderCourseList(lastActivitiesList) {
        return (
            <>
                <Table column={ columnDefs} row={rowData}/>
            </>

            // <ul>
            //     {lastActivitiesList.map((activity) => (
            //         <li key={activity.id}>
            //             <h3>{activity.title} - by: {activity?.userEntity?.username}</h3>
            //             <h3> {activity.description} </h3>
            //             <h3>posted: {activity.uploadDate} </h3>
            //
            //         </li>
            //     ))}
            // </ul>
        )
    }

    return (
        <>

            <ListCard render={renderCourseList} perPage={6} list={LastActivitiesList} header={"Last Activities"} />
        </>
    )
}



export default LastActivities;