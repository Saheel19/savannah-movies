import React, { useMemo, useState } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Fade,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import MovieIcon from "@mui/icons-material/Movie"
import PersonIcon from "@mui/icons-material/Person"
import { debounce } from "lodash"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { searchMovies } from "pages/searchActions"
import { auth } from "../firebase/firebase"
import { signOut } from "firebase/auth"
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
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { results } = useAppSelector((state) => state.search)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const user = auth.currentUser

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    await signOut(auth)
    handleMenuClose()
    navigate("/") // redirect to login/home page
  }

  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        if (query.trim() !== "") {
          dispatch(searchMovies(query))
        }
      }, 400),
    [dispatch]
  )

  const handleSearchChange = (value: string) => {
    onSearch(value)
    debouncedSearch(value)
  }

  return (
    <AppBar className="navigation-bar">
      <Toolbar
        className="navigation-toolbar"
        sx={{ display: "flex", justifyContent: "space-between", gap: 4 }}
      >
        {/* Left: Logo */}
        <Box
          className="logo-container"
          onClick={() => onNavClick("home")}
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <MovieIcon className="logo-icon" />
          <Typography className="logo-text">MovieDB</Typography>
        </Box>

        {/* Center: Nav buttons */}
        <Box
          className="nav-buttons-container"
          sx={{
            display: "flex",
            gap: 2,
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
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
            className={`nav-button ${
              currentPage === "top-rated" ? "active" : ""
            }`}
            onClick={() => onNavClick("top-rated")}
          >
            Top Rated
          </Button>
          <Button
            className={`nav-button ${currentPage === "trending" ? "active" : ""}`}
            onClick={() => onNavClick("trending")}
          >
            Trending
          </Button>
        </Box>

        {/* Right: Search + Profile */}
        <Box
          className="search-container"
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <TextField
            className="search-field"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
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

          {/* Profile Button */}
          <IconButton className="login-button" onClick={handleProfileClick}>
            <PersonIcon />
          </IconButton>

          {/* Profile Menu with animation */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            TransitionComponent={Fade}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            PaperProps={{
              sx: {
                backgroundColor: "#1a1a1a",
                color: "#fff",
                borderRadius: 2,
                minWidth: 200,
                boxShadow: "0 4px 15px rgba(0,0,0,0.6)",
              },
            }}
          >
            <MenuItem sx={{ color: "#ffffffff", fontWeight: 600 }}>
              Welcome {user?.displayName || "User"}
            </MenuItem>
            <MenuItem onClick={handleLogout} sx={{ fontWeight: 500 }}>
              Logout
            </MenuItem>
          </Menu>

          {/* Search Dropdown */}
          {searchQuery && results.length > 0 && (
            <Paper className="search-dropdown">
              <List>
                {results.map((movie: any) => (
                  <ListItemButton
                    key={movie.id}
                    onClick={() => {
                      navigate(`/movies/${movie.id}`)
                      onSearch("")
                    }}
                  >
                    <ListItemText
                      className="dropdown-text"
                      primary={movie.title}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Paper>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
