import React, {useEffect, useState} from 'react';
import {Box, Button, ButtonGroup, Stack, Typography} from "@mui/material";
import DragNDrop from "../DragNDrop.jsx";
import {addToMaterialHistory, getMaterialById} from "../../API/MaterialsAPI.jsx";
import DownloadFiles from "../DownloadFiles.jsx";


function MaterialPage() {
    const [courseID, setCourseID] = useState(location.pathname.split("/")[2]);
    const [materialId, setMaterialId] = useState(location.pathname.split("/")[4]);
    const [material, setMaterial] = useState("");
        const [showManageFile, setShowManageFile] = useState(false);

    async function handleGetMaterial() {
        const response = await getMaterialById(materialId)
        setMaterial(response)
    }

    useEffect(() => {
        handleGetMaterial()
        addToMaterialHistory(materialId)
    }, []);

    return (
        <Box width="100%">
            <Stack minWidth={"100%"}  margin={2} spacing={4} sx={{m: 4}}>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Typography variant="h3">{material.title}</Typography>
                </Box>
                <ButtonGroup variant="outlined">
                    <Button onClick={()=> setShowManageFile(true)}>Mange Files</Button>
                    <Button onClick={()=> setShowManageFile(false)}>Download Files</Button>
                </ButtonGroup>
                {showManageFile ?
                    <Box maxWidth={"60%"} minWidth={"60%"} alignSelf={"center"}>
                        <DragNDrop/>
                    </Box>
                    :
                    <Box maxWidth={"60%"} minWidth={"60%"} alignSelf={"center"}>
                       <DownloadFiles/>
                    </Box>
                }

            </Stack>
        </Box>
    );
}

export default MaterialPage;