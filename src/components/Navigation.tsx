import React from "react"
import { motion } from "framer-motion"
import { Box, Button, InputBase, AppBar, Toolbar } from "@mui/material"
import {
  navBarStyles,
  containerStyles,
  innerStyles,
  logoStyles,
  navButtonStyles,
  searchWrapperStyles,
  searchInputStyles,
  searchIconStyles,
} from "../styles/Navigation"

type PageType =
  | "popular"
  | "top_rated"
  | "upcoming"
  | "now_playing"
  | "search"
  | "movie_detail"

interface NavigationProps {
  currentPage: PageType
  searchQuery: string
  onNavClick: (pageType: PageType) => void
  onSearch: (query: string) => void
}

const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  searchQuery,
  onNavClick,
  onSearch,
}) => (
  <AppBar position="sticky" sx={navBarStyles}>
    <Toolbar sx={containerStyles}>
      <Box sx={innerStyles}>
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <Box component="h1" sx={logoStyles}>
            MovieDB
          </Box>
        </motion.div>

        {/* Nav buttons */}
        <Box sx={{ display: { xs: "none", md: "flex" }, ml: 4, gap: 2 }}>
          {[
            { key: "popular", label: "Popular" },
            { key: "top_rated", label: "Top Rated" },
            { key: "upcoming", label: "Upcoming" },
            { key: "now_playing", label: "Now Playing" },
          ].map(({ key, label }) => (
            <motion.div
              key={key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                sx={navButtonStyles(currentPage === key)}
                onClick={() => onNavClick(key as PageType)}
              >
                {label}
              </Button>
            </motion.div>
          ))}
        </Box>

        {/* Search */}
        <Box sx={searchWrapperStyles}>
          <InputBase
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            sx={searchInputStyles}
          />
          <Box
            component="svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            sx={searchIconStyles}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              fill="none"
              stroke="currentColor"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </Box>
        </Box>
      </Box>
    </Toolbar>
  </AppBar>
)

export default Navigation
