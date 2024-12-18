import React, {useEffect, useState} from "react";
import {getMaterialsHistory} from "../../API/MaterialsAPI.jsx";
import Table from "./Table.jsx";
import formatDatetime from "../../Utils/formatDatetime.js";
import {Card, Typography} from "@mui/material";

function LastActivities() {
    const [lastActivitiesList, setLastActivitiesList] = useState([]);

    const [columnDefs, setColumnDefs] = useState([
        {field: "title", headerName: "name", filter: true,},
        {field: "description", headerName: "lecturer", filter: true},
        {field: "content", headerName: "course", filter: true},
        {field: "uploadDate", headerName: "date", filter: true, cellDataType: 'dateString'}

    ]);

    useEffect(() => {

        const fetchData = async () => {
            await getMaterialsHistory().then(response => response.map((item) => ({
                ...item,
                uploadDate: formatDatetime(item.uploadDate)
            }))).then(list => setLastActivitiesList(list));
        }
        fetchData()
    }, []);


    return (
        <>
            <Card sx={{backgroundColor: "rgb(101,51,152)" , width: "100%", height: "100%", marginTop:2 ,minHeight: 400, minWidth:"60%"}}  elevation={6}  >
                <Typography color={"white"} margin={2} variant={"h4"}>Last Activities</Typography>
                <Table column={columnDefs} row={lastActivitiesList}/>
            </Card>
        </>
    )
}

export default LastActivities;