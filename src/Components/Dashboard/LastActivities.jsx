import React, {useEffect, useState} from "react";
import {getMaterialsHistory} from "../../API/MaterialsAPI.jsx";
import Table from "./Table.jsx";
import formatDatetime from "../../Utils/formatDatetime.jsx";
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
            comparator: (cellA, cellB) => {
                return compareDates(cellA, cellB)
            }
        },
        {
            field: "time",
            headerName: "Last Interaction",
            filter: 'agDateColumnFilter',
            sort:'desc',

            comparator: (cellA, cellB) => {
                return compareDates(cellA, cellB)
            }

        }
    ]);

    function compareDates(cellA, cellB) {
        if (!cellA) {
            return 0;
        }
        return  parseDateTime(cellA)- parseDateTime(cellB)
    }


    function parseDateTime(dateTimeString) {
        const datePart = dateTimeString.split(" ")
        const dateParts = datePart[0].split('/');
        const day = Number(dateParts[0]);
        const month = Number(dateParts[1]) - 1;
        const year = Number(`20${dateParts[2]}`);
        const [hours, minutes] = datePart[2].split(':');
        return new Date(year, month, day, hours,minutes);
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
                <Table column={columnDefs} row={lastActivitiesList} />
            </Card>
        </>
    )
}

export default LastActivities;