import { useState } from 'react'
import { Trains } from './components/Trains'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Hello World</h1>
      <Trains></Trains>
    </>
  )
}

export default App
