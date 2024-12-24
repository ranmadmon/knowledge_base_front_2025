import React, {useEffect, useState} from "react";
import {getMaterialsHistory} from "../../API/MaterialsAPI.jsx";
import Table from "./Table.jsx";
import formatDatetime from "../../Utils/formatDatetime.js";
import {Card, Typography} from "@mui/material";


function LastActivities() {
    const [lastActivitiesList, setLastActivitiesList] = useState([]);

    const [columnDefs, setColumnDefs] = useState([
        {
            field: "material.title",
            headerName: "Title",
        },
        {
            field: "user.fullName",
            headerName: "Uploaded By",
        },
        {
            field: "material.uploadDate",
            headerName: "Uploaded",
            filter: 'agDateColumnFilter',
            filterParams: {
                comparator: compareDates
            }
        },
        {
            field: "time",
            headerName: "Last Interaction",
            filter: 'agDateColumnFilter',
            filterParams: {
                comparator: compareDates
            }
        }
    ]);

    function compareDates(dateFromFilter, cellValue) {
        if (cellValue == null) {
            return 0;
        }

        const dateParts = cellValue.split('/');
        const day = Number(dateParts[0]);
        const month = Number(dateParts[1]) - 1
        const year = Number(20 + dateParts[2].split(' ')[0]);
        const cellDate = new Date(year, month, day);
        if (cellDate < dateFromFilter) {
            return -1;
        } else if (cellDate > dateFromFilter) {
            return 1;
        }
        return 0;
    }

    useEffect(() => {

        const fetchData = async () => {
            await getMaterialsHistory()
                .then(response => response.map((item) => ({
                    ...item,
                    time: formatDatetime(item.time),
                    material: {
                        ...item.material,
                        uploadDate: formatDatetime(item.material.uploadDate),
                    },
                })))
                .then(list => list.reverse())
                .then(list => setLastActivitiesList(list));
        }
        fetchData()
    }, []);


    return (
        <>
            <Card sx={{
                width: "100%",
                height: "100%",
                marginTop: 2,
                minHeight: 400,
                minWidth: "60%"
            }} elevation={6}>
                <Typography margin={2} variant={"h4"}>Last Activities</Typography>
                <Table column={columnDefs} row={lastActivitiesList}/>
            </Card>
        </>
    )
}

export default LastActivities;