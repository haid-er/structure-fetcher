import Dropzone from "../components/Dropzone";
import "../App.css";
import { useFileContext } from "../contexts/FileContext";
import { useState } from "react";
import ShowStructure from "../components/ShowStructure";
import { Link } from "react-router-dom";

export default function UploadFile() {
    const { setTreeData, treeData } = useFileContext();
    console.log(treeData)
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            {!treeData &&
                <Dropzone setTreeData={setTreeData} />
            }
            {treeData &&
                <ShowStructure data={treeData} />
            }
            {treeData &&
                <div className="flex items-center justify-center mt-4 gap-4">
                    <Link to={"/table"}
                        className="mt-4 border border-teal-800 hover:border-teal-600 rounded py-2 px-4 bg-transparent font-bold text-teal-800 hover:text-teal-600 transition duration-500 hover:cursor-pointer"
                    >
                        View Table
                    </Link>
                    <button
                        onClick={() => setTreeData(null)}
                        className="mt-4 border border-teal-800 hover:border-teal-600 rounded py-2 px-4 bg-transparent font-bold text-teal-800 hover:text-teal-600 transition duration-500 hover:cursor-pointer"
                    >
                        Upload New File
                    </button>
                </div>
            }
        </div>
    );
}