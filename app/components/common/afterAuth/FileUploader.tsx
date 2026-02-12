import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

interface fileUploaderProps {
    onFileSelect?: (file: File | null) => void
}
const FileUploader = ({onFileSelect}: fileUploaderProps) => {
    const onDrop = useCallback((acceptedFiles:File[]) => {
                //files
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    return (
        <div {...getRootProps()} className='border-amber-200 border border-dotted cursor-pointer'>
            <input {...getInputProps()}/>
            {
                isDragActive ?
                    <p>Drop the files here...</p>:
                    <div className='flex flex-col items-center justify-center p-5'>
                        <img src='assets/file.svg' width={50} className=''/>
                        <p className='mt-5'>Drop receipt or <span className='text-amber-400 underline'>browse files</span></p>
                    </div>
                    
            }
        </div>
    )
}

export default FileUploader