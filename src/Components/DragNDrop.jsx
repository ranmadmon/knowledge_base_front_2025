import React, {useCallback, useState} from 'react';
import {
    Alert, Box,
    Button,
    Card,
    Divider,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    ListSubheader,
    Stack
} from "@mui/material";
import {useDropzone} from "react-dropzone";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import {uploadFiles} from "../API/FilesAPI.js";
import {FILE_ERROR_CODE, SUCCESS_CODE} from "../Utils/Constants.jsx";


function DragNDrop(props) {
    const SUCCESS ="success"
    const ERROR ="error"

    const [selectedFiles, setSelectedFiles] = useState([])
    const [errorUploading, setErrorUploading] = useState("")
    const MAX_FILES = 50;


    const handleUploadFiles = async () => {
        const response = await uploadFiles(selectedFiles,props.id)
        if (response.status === SUCCESS_CODE) {
            setErrorUploading(SUCCESS)
            setSelectedFiles([])
        } else if (response.status === FILE_ERROR_CODE) {
            setErrorUploading(ERROR)
        }
    }



    const alertHandler = () => {
        if (errorUploading === ERROR) {
            return <Alert severity={ERROR}>Error uploading - File type maybe unsupported</Alert>
        } else if (errorUploading === SUCCESS) {
            return <Alert severity={SUCCESS}>File uploaded successfully</Alert>
        }

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
                    }}/>{isDragActive ? "drop files now" : "Click here to upload files"}
                    <Box sx={{mt:5}}>
                        {alertHandler()}
                    </Box>
                        </Stack>

                        <Stack direction={"column"}
                       sx={{
                           width: "40%",
                           minWidth: "40%",
                           height: "100%",
                           alignItems: "center",
                           m: 0,

                       }}
                       divider={<Divider orientation="horizontal" flexItem sx={{margin: 2}}/>}
                >
                    <List sx={{
                        width: "100%",
                        minWidth: "100%",
                        overflowY: "auto",
                        overflowX: "hidden",
                        height: "100%",
                        '&::-webkit-scrollbar': {
                            width: '0.4em',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'rgba(0,0,0,.1)',
                        }
                    }}
                          subheader={<ListSubheader> File selected:
                              ({selectedFiles.length}/{MAX_FILES})</ListSubheader>}>

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
                                    <ListItemText> {file.name} - {file.size}kb</ListItemText>
                                </ListItemButton>
                            )
                        })}

                    </List>
                    <Button onClick={() => {
                        setErrorUploading(false)
                        handleUploadFiles()
                    }}
                            variant={"contained"}
                            color={"success"}
                            sx={{width: "70%", m: 2}}
                            disabled={selectedFiles.length === 0}
                    >
                        Upload files
                    </Button>
                </Stack>
            </Stack>

        </Card>
    );
}

export default DragNDrop;