import { useState } from "react";
import flattenOrgChart from "../utils/flattenOrgchart";

export default function TableView({ data, onEdit, onDelete, onAdd }) {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(null);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  const flattenData = flattenOrgChart(data);
  const displayData = filtered ?? flattenData;

  function handleSearch() {
    const term = search.trim().toLowerCase();
    if (!term) {
      setFiltered(null);
      return;
    }
    setFiltered(
      flattenData.filter(
        row =>
          row.name.toLowerCase().includes(term) ||
          (row.parent && row.parent.toLowerCase().includes(term)) ||
          String(row.level).includes(term)
      )
    );
  }

  function exportToCSV() {
    if (!flattenData.length) return;

    const headers = ["Company", "Parent", "Level"];
    const rows = flattenData.map(row => [
      `"${row.name}"`,
      `"${row.parent || ""}"`,
      `"${row.level}"`
    ]);
    const csvContent =
      headers.join(",") + "\n" +
      rows.map(r => r.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "org_chart.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="w-[70vw] border border-gray-200 rounded-xl overflow-x-auto overflow-auto h-[80vh] scrollbar" id="style-1">
      <div className="flex items-center gap-2 p-5 bg-gray-50 sticky top-0 z-20">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search company, parent or level"
          className="border rounded px-2 py-1"
        />
        <button
          onClick={handleSearch}
          className="border border-blue-800 hover:border-blue-600 rounded py-1 px-4 bg-transparent font-bold text-blue-800 hover:text-blue-600 transition duration-500 hover:cursor-pointer"
        >
          Search
        </button>
        <button
          onClick={() => { setSearch(""); setFiltered(null); }}
          className="border border-gray-800 hover:border-gray-600 rounded py-1 px-4 bg-transparent font-bold text-gray-800 hover:text-gray-600 transition duration-500 hover:cursor-pointer"
        >
          Clear
        </button>
        <button
          onClick={exportToCSV}
          className="ml-auto border border-green-800 hover:border-green-600 rounded py-1 px-4 bg-transparent font-bold text-green-800 hover:text-green-600 transition duration-500 hover:cursor-pointer"
        >
          📝 Export CSV
        </button>
      </div>
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 text-slate-800 sticky top-10 z-10">
          <tr className="divide-x divide-gray-200">
            <th className="px-4 py-2 text-left">Company</th>
            <th className="px-4 py-2 text-left">Parent</th>
            <th className="px-4 py-2 text-left">Level</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white text-slate-800">
          {displayData.map((row, idx) => (
            <tr key={idx} className="divide-x divide-gray-200">
              <td className="px-4 py-2">{row.name}</td>
              <td className="px-4 py-2">{row.parent || "—"}</td>
              <td className="px-4 py-2">{row.level}</td>
              <td className="px-4 py-2 flex gap-1 justify-center">
                <button
                  onClick={() => onAdd(row.path)}
                  className="border border-purple-800 hover:border-purple-600 rounded py-1 px-4 bg-transparent font-bold text-purple-800 hover:text-purple-600 transition duration-500 hover:cursor-pointer flex items-center gap-1"
                  title="Add"
                >
                  <span className="material-icons">add</span>
                </button>
                <button
                  onClick={() => onEdit(row.path)}
                  className="border border-yellow-800 hover:border-yellow-600 rounded py-1 px-4 bg-transparent font-bold text-yellow-800 hover:text-yellow-600 transition duration-500 hover:cursor-pointer flex items-center gap-1"
                  title="Edit"
                >
                  <span className="material-icons">edit</span>
                </button>
                <button
                  onClick={() => onDelete(row.path)}
                  className="border border-red-800 hover:border-red-600 rounded py-1 px-4 bg-transparent font-bold text-red-800 hover:text-red-600 transition duration-500 hover:cursor-pointer flex items-center gap-1"
                  title="Delete"
                >
                  <span className="material-icons">delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
