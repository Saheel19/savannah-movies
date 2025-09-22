import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Home"
import MovieDetails from "./Movie.Details"
import Layout from "../components/Layout"
import "../styles/App.scss"

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Layout with Navigation */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="movies/:id" element={<MovieDetails />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
