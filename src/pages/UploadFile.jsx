import Dropzone from "../components/Dropzone";
import "../App.css";
import { useFileContext } from "../contexts/FileContext";
import { useState } from "react";
import ShowStructure from "../components/ShowStructure";
import { Link } from "react-router-dom";

export default function UploadFile() {
    const { setTreeData, treeData } = useFileContext();
    const { isTreeOpen, setIsTreeOpen } = useState(false);
    console.log(treeData)
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            {!treeData &&
                <Dropzone setTreeData={setTreeData} setisTreeOpen />
            }
            {treeData &&
                <ShowStructure data={treeData} />
            }
            {treeData &&
                <Link to={"/table"}
                    className="mt-4 border border-teal-800 hover:border-teal-600 rounded py-2 px-4 bg-transparent font-bold text-teal-800 hover:text-teal-600 transition duration-500 hover:cursor-pointer"
                >
                    View Table
                </Link>
            }
        </div>
    );
}