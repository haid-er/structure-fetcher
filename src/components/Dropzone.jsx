import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import documentIcon from '../assets/document.png'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
function Dropzone() {
    let [file, setFile] = useState(null);
    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
        }
    }, []);

    const uploadFile = async () => {
        const formData = new FormData();
        let response;
        if (file) {

            formData.append('file', file);

            response = await axios.post(`${BACKEND_URL}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'enctype': 'multipart/form-data'
                },
            });
            console.log(response);
            toast.success(response?.data?.message);
        } else {
            toast.error("No File to upload.");
        }
        return response?.data;
    };

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({ onDrop });
    return (
        <>
            <div {...getRootProps({
                className: `dropzone 
                    ${isDragActive ? 'active' : ''} 
                    ${isDragAccept ? 'accept' : ''} 
                    ${isDragReject ? 'reject' : ''}`
            })}>
                <input {...getInputProps()} />
                <img src={documentIcon} alt="Document Icon" width={50} className='document' />
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                }
            </div>
            {file && <button onClick={uploadFile}>Upload the File</button>}
            <Toaster />
        </>
    )
}

export default Dropzone;