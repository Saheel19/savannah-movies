import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Home"
import MovieDetails from "./Movie.Details"
import Layout from "../components/Layout"
import MoviesPage from "./MoviesPage"
import "../styles/App.scss"

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Layout with Navigation */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="movies/:id" element={<MovieDetails />} />
          <Route
            path="/movies/trending"
            element={<MoviesPage type="trending" />}
          />
          <Route
            path="/movies/popular"
            element={<MoviesPage type="popular" />}
          />
          <Route
            path="/movies/top_rated"
            element={<MoviesPage type="top_rated" />}
          />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
