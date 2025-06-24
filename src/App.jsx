import { useState } from 'react'
import './App.css'
import Dropzone from './components/Dropzone'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Company Structure Fetcher</h1>
      <div className="card">
        <Dropzone />
      </div>
    </>
  )
}

export default App
