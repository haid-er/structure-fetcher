import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function Home() {
    const navigate = useNavigate();
    const [history, setHistory] = useState([]);

    const handleHistoryClick = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/user/get-history`);
            setHistory(response.data.data || []);
            console.log(response.data); // Log the fetched history data
        } catch (error) {
            console.error("Error fetching history:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Structure Fetcher</h1>
            <p className="text-lg text-gray-600 mb-8">
                Click below button to upload the hierarchy.
            </p>
            <button
                className="my-4 border border-blue-600 hover:border-blue-400 rounded py-2 px-4 bg-transparent font-bold text-blue-600 hover:text-blue-400 transition duration-500 hover:cursor-pointer"
                onClick={() => navigate("/upload-file")}
            >
                Upload New
            </button>
            <button
                className="mt-4 border border-gray-800 hover:border-gray-900 rounded py-2 px-4 bg-transparent font-bold text-gray-800 hover:text-gray-900 transition duration-500 hover:cursor-pointer"
                onClick={handleHistoryClick}
            >
                History
            </button>
            {/* Table for history records */}
            {history.length > 0 && (
                <div className="w-full max-w-4xl">
                    <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
                        <tbody>
                            {history.map((record) => (
                                <tr key={record._id} className="border-b border-gray-200">
                                    <td className="flex items-start p-4 gap-4">
                                        <img
                                            src={record.imageUrl !== "anonymous" ? record.imageUrl : "https://via.placeholder.com/60"}
                                            alt={record.imageKey}
                                            className="h-60 w-60 object-contain rounded shadow"
                                        />
                                        <pre className="whitespace-pre-wrap break-words text-xs bg-gray-100 p-2 rounded max-w-xl overflow-x-auto h-60 w-full" id="style-2">
                                            {JSON.stringify(JSON.parse(record.json), null, 2)}
                                        </pre>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}