import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './component/Navbar.jsx'
import Navbar from './component/Navbar.jsx'
import LandingPage from './component/LandingPage.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
    <LandingPage />
    </>
  )
}

export default App
