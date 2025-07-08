import { useState } from 'react'
import './App.css'
import Dropzone from './components/Dropzone'
import ShowD3 from './components/ShowD3';
import { Toaster } from 'react-hot-toast';

function App() {
  const [treeData, setTreeData] = useState(null);
  const [isTreeOpen, setisTreeOpen] = useState(null);
  return (
    <>
      <h1>Company Structure Fetcher</h1>
      {!isTreeOpen &&
        <div className="card">
          <Dropzone setisTreeOpen={setisTreeOpen} setTreeData={setTreeData} />
        </div>
      }

      {isTreeOpen &&
        <div>
          <button onClick={() => { setisTreeOpen(false) }}>Hide Tree</button>
          <ShowD3 treeData={treeData} />
        </div>
      }
      <Toaster />
    </>
  )
}

export default App
