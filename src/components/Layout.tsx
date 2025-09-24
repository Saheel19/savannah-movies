import React, { useState, useEffect, useCallback } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { useAppDispatch } from "../store/hooks"
import Navigation from "./Navigation"
import { searchMovies } from "pages/_actions"
import debounce from "lodash/debounce"

const Layout: React.FC = () => {
  const [currentPage, setCurrentPage] = useState("home")
  const [searchQuery, setSearchQuery] = useState("")
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (query.trim() !== "") {
        dispatch(searchMovies(query))
      }
    }, 500),
    [dispatch]
  )

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      debouncedSearch(searchQuery)
    }
  }, [searchQuery, debouncedSearch])

  useEffect(() => {
    if (location.pathname.includes("popular")) {
      setCurrentPage("popular")
    } else if (location.pathname.includes("top_rated")) {
      setCurrentPage("top-rated")
    } else if (location.pathname.includes("trending")) {
      setCurrentPage("trending")
    } else if (location.pathname === "/") {
      setCurrentPage("home")
    } else {
      setCurrentPage("")
    }
  }, [location.pathname])

  return (
    <>
      <Navigation
        currentPage={currentPage}
        searchQuery={searchQuery}
        onNavClick={(page) => {
          setCurrentPage(page)
          navigate(
            page === "home"
              ? "/"
              : `/movies/${page === "top-rated" ? "top_rated" : page}`
          )
        }}
        onSearch={setSearchQuery}
      />
      <main style={{ paddingTop: "90px" }}>
        <Outlet />
      </main>
    </>
  )
}

export default Layout
