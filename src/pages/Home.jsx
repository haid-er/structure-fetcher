import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Structure Fetcher</h1>
            <p className="text-lg text-gray-600 mb-8">
                Click below button to upload the hierarchy.
            </p>
            <button
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition cursor-pointer"
                onClick={() => navigate("/upload-file")}
            >
                Upload
            </button>
        </div>
    );
}