import React, {useEffect, useState} from 'react';
import {Card, Divider, Stack, Typography} from "@mui/material";
import {getMaterialFiles} from "../../API/FilesAPI.jsx";
import DownloadIcon from '@mui/icons-material/Download';

function DownloadFiles() {
    const SUCCESS = "success"
    const ERROR = "error"
    const [cloudFiles, setCloudFiles] = useState([]);
    const [materialId, setMaterialId] = useState(location.pathname.split("/")[4]);

    async function handleGetMaterialFiles() {
        const response = await getMaterialFiles(materialId)
        setCloudFiles(response)
    }

    useEffect(() => {
        handleGetMaterialFiles()
    }, []);



    return (
        <Card sx={{
            width: "100%",
            height: "60vh",
            marginTop: 2,
            minHeight: "100%",
            maxHeight: "100%",
            maxWidth: "100%",
            minWidth: "100%",
        }}
              elevation={6}>
            <Stack sx={{height: "100%"}} direction="row"
                   divider={<Divider orientation="vertical" flexItem sx={{margin: 2}}/>}
            >
                <Typography>באמצע שיהיה רשום נוטינג יט</Typography>
            </Stack>
        </Card>
    );
}

export default DownloadFiles;