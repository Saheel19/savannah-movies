import React, { useState, useEffect, JSX } from "react"
import { Provider, useSelector } from "react-redux"
import { store } from "../store/store"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import { Box, CircularProgress, Backdrop } from "@mui/material"

import Home from "./Home"
import MovieDetails from "./Movie.Details"
import Layout from "../components/Layout"
import MoviesPage from "./MoviesPage"
import AuthForm from "../components/LogIn"
import { auth } from "../firebase/firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"

import "../styles/App.scss"

// Global Loader Component
const GlobalLoader: React.FC = () => {
  const loading = useSelector((state: any) => state.movies.loading)
  return (
    <Backdrop
      open={loading}
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 9999 }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

// Protected Route wrapper
const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setChecking(false)
    })
    return () => unsubscribe()
  }, [])

  if (checking) {
    return (
      <Backdrop
        open
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 9999 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  }

  if (!user) {
    return <AuthForm onAuthSuccess={(u) => setUser(u)} />
  }

  return children
}

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <GlobalLoader /> {/* Loader available globally */}
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />

            {/* Movie details */}
            <Route path="movies/:id" element={<MovieDetails />} />

            {/* Category pages */}
            <Route
              path="movies/trending"
              element={<MoviesPage type="trending" />}
            />
            <Route
              path="movies/popular"
              element={<MoviesPage type="popular" />}
            />
            <Route
              path="movies/top_rated"
              element={<MoviesPage type="top_rated" />}
            />
          </Route>

          {/* Redirect any unknown path to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
