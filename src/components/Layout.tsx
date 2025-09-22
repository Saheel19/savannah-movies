import React, { useState } from "react"
import { Outlet } from "react-router-dom"
import Navigation from "./Navigation"

const Layout: React.FC = () => {
  const [currentPage, setCurrentPage] = useState("home")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <>
      <Navigation
        currentPage={currentPage}
        searchQuery={searchQuery}
        onNavClick={setCurrentPage}
        onSearch={setSearchQuery}
      />
      <main style={{ paddingTop: "90px" }}>
        <Outlet />
      </main>
    </>
  )
}

export default Layout
