import { useState } from "react";
import "./App.css";
import Dropzone from "./components/Dropzone";
import { Toaster } from "react-hot-toast";
import ShowStructure from "./components/ShowStructure";
import TableViewWithActions from "./components/TableViewWithActions";
import Swal from "sweetalert2";

function App() {
  const [treeData, setTreeData] = useState(null);
  const [isTreeOpen, setisTreeOpen] = useState(null);
  const [isTableOpen, setisTableOpen] = useState(false);
  const handleExport = () => {
    try {
      const jsonStr = JSON.stringify(treeData, null, 2);
      const blob = new Blob([jsonStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "treeData.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export failed:", err);
      Swal.fire({
        icon: "error",
        title: "Export Failed",
        text: err.message,
      });
    }
  };
  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center h-[100vh]">
      <h1 className="font-bold text-2xl mb-5">Company Structure Fetcher</h1>
      {!treeData && (
        <div className="card flex flex-col items-center justify-center gap-5">
          <Dropzone setisTreeOpen={setisTreeOpen} setTreeData={setTreeData} />
        </div>

      )}
      {!isTreeOpen && !isTableOpen && <div className="flex flex-col gap-5">

        {treeData && <button
          onClick={() => {
            setisTreeOpen(true);
          }}
          className="border border-teal-800 hover:border-teal-600 rounded py-4 px-8 bg-transparent font-bold text-teal-800 hover:text-teal-600 transition duration-500 hover:cursor-pointer"
        >
          Show Tree
        </button>}
        {treeData && !isTableOpen && <button
          onClick={() => {
            setisTableOpen(true);
          }}
          className="border border-teal-800 hover:border-teal-600 rounded py-4 px-8 bg-transparent font-bold text-teal-800 hover:text-teal-600 transition duration-500 hover:cursor-pointer"
        >
          Show Table
        </button>
        }
        {
          treeData && <button
            onClick={() => {
              setTreeData(null);
              setisTreeOpen(false);
              setisTableOpen(false);
            }}
            className="border border-teal-800 hover:border-teal-600 rounded py-4 px-8 bg-transparent font-bold text-teal-800 hover:text-teal-600 transition duration-500 hover:cursor-pointer"
          >
            Upload New Chart</button>
        }

      </div>}
      {isTableOpen && (
        <div className="flex flex-col items-center justify-center gap-5">
          <TableViewWithActions data={treeData} setTreeData={setTreeData} />
          {treeData && <button
            onClick={() => {
              setisTableOpen(false);
            }
            }
            className="border border-teal-800 hover:border-teal-600 rounded py-4 px-8 bg-transparent font-bold text-teal-800 hover:text-teal-600 transition duration-500 hover:cursor-pointer"
          >
            Hide Table
          </button>}
        </div>
      )}
      {isTreeOpen && !isTableOpen && (
        <div className="flex flex-col items-center justify-center gap-5">
          <div className="flex gap-5 mx-5">
            <ShowStructure data={treeData} />
          </div>
          {treeData && <div className="flex gap-5 mx-5">
            <button
              onClick={() => {
                setisTreeOpen(false);
              }}
              className="border border-teal-800 hover:border-teal-600 rounded py-4 px-8 bg-transparent font-bold text-teal-800 hover:text-teal-600 transition duration-500 hover:cursor-pointer"
            >
              Hide Tree
            </button>
            <button
              onClick={handleExport}
              className="border border-teal-800 hover:border-teal-600 rounded py-4 px-8 bg-transparent font-bold text-teal-800 hover:text-teal-600 transition duration-500 hover:cursor-pointer"
            >
              📤 Export JSON
            </button>
          </div>
          }
        </div>
      )}
      <Toaster />
    </div>
  );
}

export default App;
