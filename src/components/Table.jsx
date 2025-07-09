export default function Table({ data }) {
    return (<>
        <div className="w-full border border-gray-200 rounded-xl overflow-x-auto">
            <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 text-slate-800">
                    <tr className="divide-x divide-gray-200">
                        <th className="px-4 py-2">Heading</th>
                        <th className="px-4 py-2">Heading</th>
                        <th className="px-4 py-2">Heading</th>
                        <th className="px-4 py-2">Heading</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white text-slate-800">
                    <tr className="divide-x divide-gray-200">
                        <td className="px-4 py-2">Row</td>
                        <td className="px-4 py-2">Row</td>
                        <td className="px-4 py-2">Row</td>
                        <td className="px-4 py-2">Row</td>
                    </tr>
                    <tr className="divide-x divide-gray-200">
                        <td className="px-4 py-2">Row</td>
                        <td className="px-4 py-2">Row</td>
                        <td className="px-4 py-2">Row</td>
                        <td className="px-4 py-2">Row</td>
                    </tr>
                    <tr className="divide-x divide-gray-200">
                        <td className="px-4 py-2">Row</td>
                        <td className="px-4 py-2">Row</td>
                        <td className="px-4 py-2">Row</td>
                        <td className="px-4 py-2">Row</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>)
}