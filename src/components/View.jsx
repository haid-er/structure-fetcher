import { useState } from "react";

export default function ViewCSV() {
    const [csvData, setCsvData] = useState([]);
    const [error, setError] = useState("");

    function handleFileUpload(e) {
        setError("");
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (evt) {
            const text = evt.target.result;
            const rows = text.trim().split("\n");
            if (rows.length < 2) {
                setError("CSV must have at least one data row.");
                setCsvData([]);
                return;
            }
            const headers = rows[0].split(",");
            if (headers.length < 3) {
                setError("CSV must have at least three columns.");
                setCsvData([]);
                return;
            }
            const dataRows = rows.slice(1).map(row => {
                const cols = row.split(",");
                return {
                    company: cols[0]?.replace(/^"|"$/g, ""),
                    parent: cols[1]?.replace(/^"|"$/g, ""),
                    level: cols[2]?.replace(/^"|"$/g, "")
                };
            });
            setCsvData(dataRows);
        };
        reader.onerror = () => setError("Failed to read file.");
        reader.readAsText(file);
    }

    return (
        <div className="w-[70vw] border border-gray-200 rounded-xl overflow-x-auto overflow-auto h-[70vh] scrollbar p-5">
            <div className="flex items-center gap-2 mb-4">
                <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="border rounded px-2 py-1"
                />
                {error && <span className="text-red-600">{error}</span>}
            </div>
            <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 text-slate-800 sticky top-0 z-10">
                    <tr className="divide-x divide-gray-200">
                        <th className="px-4 py-2 text-left">Company</th>
                        <th className="px-4 py-2 text-left">Parent</th>
                        <th className="px-4 py-2 text-left">Level</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white text-slate-800">
                    {csvData.length === 0 ? (
                        <tr>
                            <td colSpan={3} className="px-4 py-2 text-center text-gray-500">
                                No data to display. Upload a CSV file.
                            </td>
                        </tr>
                    ) : (
                        csvData.map((row, idx) => (
                            <tr key={idx} className="divide-x divide-gray-200">
                                <td className="px-4 py-2">{row.company}</td>
                                <td className="px-4 py-2">{row.parent || "—"}</td>
                                <td className="px-4 py-2">{row.level}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}