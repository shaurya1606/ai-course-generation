import React from 'react'
import { UploadCloud } from 'lucide-react'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FileUploaderProps } from '@/types/types'
import { formatSize } from '@/lib/utils'
import Image from 'next/image'
import { Button } from '../ui/button'


const FileUploader = ({ onFileSelect, file: fileProp }: FileUploaderProps) => {


    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file: File = acceptedFiles[0];

        onFileSelect?.(file);
    }, [onFileSelect])

    const maxFileSize = 20 * 1024 * 1024; // 20 MB

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false, accept: { 'application/pdf': ['.pdf'], 'application/msword': ['.doc', '.docx'] }, maxFiles: 1, maxSize: maxFileSize });

    const file: File | null = fileProp || null;


    return (
        <div {...getRootProps()} className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 w-full mt-2 transition-colors duration-300 ease-in-out ${isDragActive ? 'border-indigo-600 bg-neutral-800' : 'border-neutral-700 hover:border-indigo-500'}`}>
            <input {...getInputProps()} />
            {file ? (
                <div className='w-full text-center'>
                    <Image src='/images/pdf.png' alt='File Type' width={32} height={32} className='mx-auto mb-2' />
                    <p className='font-medium text-white'>{file.name}</p>
                    <p className='text-neutral-400 text-sm'>{formatSize(file.size)}</p>
                    <Button variant='destructive' className='mt-4' onClick={(e) => { e.stopPropagation(); onFileSelect?.(null); }}>
                        Remove File
                    </Button>
                </div>
            ) : isDragActive ? (
                <>
                    <UploadCloud className='w-12 h-12 text-indigo-500 animate-bounce' />
                    <p className='text-neutral-400 mt-2'>Drop the file here ...</p>
                </>
            ) : (
                <>
                    <UploadCloud className='w-12 h-12 text-neutral-500' />
                    <p className='text-neutral-400 mt-2'>Click to upload or drag and drop</p>
                    <p className='text-xs text-neutral-500 mt-1'>PDF, DOC, DOCX (Max: {formatSize(maxFileSize)})</p>
                </>
            )}
        </div>
    )
}

export default FileUploader