import React, {useCallback, useState} from 'react';
import {
    Box,
    Card, Divider,
    IconButton,
    Input,
    List,
    ListItemButton,
    ListSubheader,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {useDropzone} from "react-dropzone";
import axios from "axios";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteIcon from '@mui/icons-material/Delete';

function DragNDrop(props) {
    const [selectedFiles, setSelectedFiles] = useState([])
    const MAX_FILES = 5;
    const uploadFiles = () => {
        const data = new FormData();
        data.append('file', selectedFiles[0]);
        axios.post("http://localhost:8080/upload-file1", data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(response => {
                setSelectedFiles([])
            })
            .catch(error => {
                console.error("Error uploading file:", error);
            });
    }

    const onDrop = useCallback((acceptedFiles) => {
                setSelectedFiles(prevState => {
                    const newFiles = [];

                    acceptedFiles.forEach(acceptedFile => {
                        const alreadyExists = prevState.some(existingFile => {
                            return existingFile.path === acceptedFile.path;
                        });

                        if (!alreadyExists) {
                            newFiles.push(acceptedFile);
                        }
                    });
                    const combinedFiles = [...prevState, ...newFiles];
                    return combinedFiles.slice(0, MAX_FILES);
                })
            }
            ,
            []
        )
    ;
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    return (
        <Card sx={{
            width: "100%",
            height: "100%",
            marginTop: 2,
            minHeight: 400,
            minWidth: "60%"
        }}
              elevation={6}>
            <Stack sx={{height: "100%"}} direction="row"
                   divider={
                       <Divider orientation="vertical" flexItem sx={{margin: 2}}/>
                   }>

                <Stack {...getRootProps()} sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "70%",
                    height: "100%",
                }}> <input type={"file"} {...getInputProps()} />

                    <FileUploadIcon sx={{
                        width: "30%",
                        height: "30%",
                    }}/>{isDragActive ? "drop now" : "Click here to Upload files"}</Stack>
                <List sx={{
                    width: "40%",
                    minWidth: "40%",

                    height: "100%",
                }}>
                    <ListSubheader>
                        File selected: ({selectedFiles.length}/{MAX_FILES})
                    </ListSubheader>

                    {selectedFiles.map((file) => {
                        return (
                            <ListItemButton
                                key={file.name}>
                                <IconButton onClick={() => setSelectedFiles(prevState => prevState.filter(item => {
                                    return item.path !== file.path
                                }))}>
                                    <DeleteIcon
                                        sx={{'&:hover': {color: 'red'}}}
                                    />
                                </IconButton>
                                <Typography> {file.name} - {file.size}kb</Typography>
                            </ListItemButton>
                        )

                    })}
                </List>


            </Stack>

        </Card>
    );
}

export default DragNDrop;