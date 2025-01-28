import FileUploader from '@/components/FileUploader';

export default function UploadPage() {
    return (
        <main className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                    File Upload
                </h1>
                <FileUploader />
            </div>
        </main>
    );
}