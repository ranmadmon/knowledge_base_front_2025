import {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import axios from "axios";

function FileUpload() {
    const [selectedFiles, setSelectedFiles] = useState([])

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
        setSelectedFiles(acceptedFiles);
    }, []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                }
                {
                    selectedFiles.map((file) => {
                        return (
                            <div>
                                {file.name}:
                            </div>
                        )
                    })
                }
            </div>
            <div style={{
                marginTop: '50px'
            }}>
                <button onClick={uploadFiles} disabled={selectedFiles.length == 0}>Upload</button>

            </div>
        </div>
    )
}

export default FileUpload;