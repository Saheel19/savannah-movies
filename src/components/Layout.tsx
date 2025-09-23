import React, { useState } from "react"
import { Outlet, useNavigate, useLocation } from "react-router-dom"
import Navigation from "./Navigation"

const Layout: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()
  const location = useLocation()

  // Derive current page from URL
  const getCurrentPage = () => {
    const path = location.pathname
    if (path === "/") return "home"
    if (path === "/movies/popular") return "popular"
    if (path === "/movies/top_rated") return "top-rated"
    if (path === "/movies/upcoming") return "upcoming"
    if (path === "/movies/now_playing") return "now-playing"
    return ""
  }

  const currentPage = getCurrentPage()

  const handleNavClick = (page: string) => {
    // Map page names to routes
    const routesMap: Record<string, string> = {
      home: "/",
      popular: "/movies/popular",
      "top-rated": "/movies/top_rated",
    }
    const path = routesMap[page]
    if (path) navigate(path)
  }

  return (
    <>
      <Navigation
        currentPage={currentPage}
        searchQuery={searchQuery}
        onNavClick={handleNavClick}
        onSearch={setSearchQuery}
      />
      <main style={{ paddingTop: "90px" }}>
        <Outlet />
      </main>
    </>
  )
}

export default Layout
