"use client"

import {useState, DragEvent, ChangeEvent, JSX} from 'react';
import { Upload } from 'lucide-react';

export default function FileUploader(): JSX.Element {
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string>('');

    const handleDrag = (e: DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragging(true);
        } else if (e.type === "dragleave") {
            setIsDragging(false);
        }
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleFileSelect = (e: ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleUpload = async (): Promise<void> => {
        if (!selectedFile) return;
        setUploadStatus('Uploading...');
        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch('http://localhost:8080/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok || response.status === 201) {
                setUploadStatus('Upload successful!');
                setSelectedFile(null);
            } else {
                setUploadStatus('Upload failed');
            }
        } catch (error) {
            setUploadStatus('Upload failed');
            console.error('Upload error:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <div
                className={`border-2 border-dashed rounded-lg p-8 text-center ${
                    isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                    Drag and drop a file here, or click to select
                </p>
                <input
                    type="file"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="fileInput"
                />
                <label
                    htmlFor="fileInput"
                    className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
                >
                    Select File
                </label>
                {selectedFile && (
                    <div className="mt-4">
                        <p className="text-sm text-gray-600">
                            Selected: {selectedFile.name}
                        </p>
                        <button
                            onClick={handleUpload}
                            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            Upload File
                        </button>
                    </div>
                )}
                {uploadStatus && (
                    <p className="mt-2 text-sm text-gray-600">{uploadStatus}</p>
                )}
            </div>
        </div>
    );
}