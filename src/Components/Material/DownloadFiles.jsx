import React, {useEffect, useState} from 'react';
import {Card, Divider, Stack, Typography} from "@mui/material";
import {getMaterialFiles} from "../../API/FilesAPI.jsx";
import DownloadIcon from '@mui/icons-material/Download';
import axios from "axios";
import {SERVER_URL} from "../../Utils/Constants.jsx";

function DownloadFiles() {
    const SUCCESS = "success"
    const ERROR = "error"
    const [cloudFiles, setCloudFiles] = useState([]);
    const [materialId, setMaterialId] = useState(location.pathname.split("/")[4]);
    const [filesName,setFilesName] =useState([])
    async function handleGetMaterialFiles() {
        const response = await getMaterialFiles(materialId)
        setCloudFiles(response)
    }

    useEffect(() => {
        handleGetMaterialFiles()
        getMaterialFilesName()
    }, []);

    function getMaterialFilesName() {
axios.get(SERVER_URL+"/get-material-file-by-id?id="+materialId).then(
    response=>{
        if (response!=null){
            setFilesName(response.data)

        }
    }
)
    }

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
                <Typography>
                    <h1>Files: </h1>
                    {
                     filesName.map((file,index)=>{
                         return(
                             <div key={index}>
                                 {index+1}) Filename: {file.fileName} ,File path: {file.filePath},fileSize: {file.fileSize},uploadedBy:{file.uploadedBy}
                             </div>
                         )
                     })
                    }
                </Typography>
            </Stack>
        </Card>
    );
}

export default DownloadFiles;