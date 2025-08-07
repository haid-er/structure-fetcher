import TableViewWithActions from "../components/TableViewWithActions";
import { useFileContext } from "../contexts/FileContext";

export default function Table() {
    const { treeData, setTreeData } = useFileContext();
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-5xl">
                <TableViewWithActions data={treeData} setTreeData />
            </div>
        </div>
    );
}