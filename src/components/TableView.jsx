import flattenOrgChart from "../utils/flattenOrgchart";

export default function TableView({ data, onEdit, onDelete, onAdd }) {
  if (!data) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  const flattenData = flattenOrgChart(data);
  // console.log(flattenData);
  return (
    <div className="w-full border border-gray-200 rounded-xl overflow-x-auto overflow-auto max-h-[80vh] scrollbar" id="style-1">
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 text-slate-800 sticky top-0 z-10">
          <tr className="divide-x divide-gray-200">
            <th className="px-4 py-2 text-left">Company</th>
            <th className="px-4 py-2 text-left">Parent</th>
            <th className="px-4 py-2 text-left">Level</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white text-slate-800">
          {flattenData.map((row, idx) => (
            <tr key={idx} className="divide-x divide-gray-200">
              <td className="px-4 py-2">{row.name}</td>
              <td className="px-4 py-2">{row.parent || "—"}</td>
              <td className="px-4 py-2">{row.level}</td>
              <td className="px-4 py-2 flex gap-2">
                <button onClick={() => onAdd(row.path)} className="cursor-pointer rounded-2xl hover:shadow-lg hover:scale-150">➕</button>
                <button onClick={() => onEdit(row.path)} className="cursor-pointer rounded-2xl hover:shadow-lg hover:scale-150">✏️</button>
                <button onClick={() => onDelete(row.path)} className="cursor-pointer rounded-2xl hover:shadow-lg hover:scale-150">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
