import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Home"

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Later: add /movie/:id, /login, etc. */}
      </Routes>
    </Router>
  )
}

export default App
