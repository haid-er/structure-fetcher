import { useState } from "react";
import "./App.css";
import Dropzone from "./components/Dropzone";
import ShowD3 from "./components/ShowD3";
import { Toaster } from "react-hot-toast";
import Table from "./components/Table";
import ShowStructure from "./components/ShowStructure";

function App() {
  const [treeData, setTreeData] = useState(null);
  const [isTreeOpen, setisTreeOpen] = useState(null);
  return (
    <div className="coontainer mx-auto p-4 flex flex-col items-center justify-center h-[100vh]">
      <h1 className="font-bold text-2xl mb-5">Company Structure Fetcher</h1>
      {!isTreeOpen && (
        <div className="card">
          <Dropzone setisTreeOpen={setisTreeOpen} setTreeData={setTreeData} />
        </div>
      )}

      {isTreeOpen && (
        <div className="flex flex-col items-center justify-center gap-5">
          <div className="flex gap-5 mx-5">
            {/* <Table /> */}
            <ShowStructure />
          </div>
          <button
            onClick={() => {
              setisTreeOpen(false);
            }}
            className="border border-teal-800 hover:border-teal-600 rounded py-4 px-8 bg-transparent font-bold text-teal-800 hover:text-teal-600 transition duration-500 hover:cursor-pointer"
          >
            Hide Tree
          </button>
          {/* <ShowD3 treeData={treeData} /> */}
        </div>
      )}
      <Toaster />
    </div>
  );
}

export default App;
