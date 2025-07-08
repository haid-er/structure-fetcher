import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import documentIcon from '../assets/document.png'
import axios from 'axios';
import toast from 'react-hot-toast';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
function Dropzone({ setisTreeOpen, setTreeData }) {
    let [file, setFile] = useState(null);
    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
        }
    }, []);

    const uploadFile = async () => {
        setisTreeOpen(true);
        const formData = new FormData();
        let response;
        if (file) {
            try {

                formData.append('file', file);

                response = await axios.post(`${BACKEND_URL}/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'enctype': 'multipart/form-data'
                    },
                });
                if (response?.data) {
                    console.log(response?.data)
                    setTreeData(response?.data);
                }
                toast.success(response?.data?.message || "Success");
            } catch (error) {
                toast.error(response?.data?.message || "Error");
            }
        } else {
            toast.error("No File Selected");
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
            {file && <button onClick={uploadFile} style={{ margin: "0px 10px" }}>Generate the Tree</button>}
        </>
    )
}

export default Dropzone;