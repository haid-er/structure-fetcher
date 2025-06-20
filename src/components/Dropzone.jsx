import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import documentIcon from '../assets/document.png'
function Dropzone() {
    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles)
    }, [])
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({ onDrop });
    return (
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
    )
}

export default Dropzone;