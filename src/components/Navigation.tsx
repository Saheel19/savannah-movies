import React from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Button,
  IconButton,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import MovieIcon from "@mui/icons-material/Movie"
import PersonIcon from "@mui/icons-material/Person"
import "../styles/Navigation.scss"

interface NavigationProps {
  currentPage: string
  searchQuery: string
  onNavClick: (page: string) => void
  onSearch: (query: string) => void
}

const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  searchQuery,
  onNavClick,
  onSearch,
}) => {
  return (
    <AppBar className="navigation-bar">
      <Toolbar className="navigation-toolbar">
        <Box className="logo-container">
          <MovieIcon className="logo-icon" />
          <Typography className="logo-text">MovieDB</Typography>
        </Box>

        <Box className="nav-buttons-container">
          <Button
            className={`nav-button ${currentPage === "home" ? "active" : ""}`}
            onClick={() => onNavClick("home")}
          >
            Home
          </Button>
          <Button
            className={`nav-button ${currentPage === "popular" ? "active" : ""}`}
            onClick={() => onNavClick("popular")}
          >
            Popular
          </Button>
          <Button
            className={`nav-button ${currentPage === "top-rated" ? "active" : ""}`}
            onClick={() => onNavClick("top-rated")}
          >
            Top Rated
          </Button>
          <Button
            className={`nav-button ${currentPage === "upcoming" ? "active" : ""}`}
            onClick={() => onNavClick("upcoming")}
          >
            Upcoming
          </Button>
          <Button
            className={`nav-button ${currentPage === "now-playing" ? "active" : ""}`}
            onClick={() => onNavClick("now-playing")}
          >
            Now Playing
          </Button>
        </Box>

        <Box className="search-container">
          <TextField
            className="search-field"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            size="small"
          />
          <IconButton className="login-button">
            <PersonIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
