import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { motion, AnimatePresence } from "framer-motion"
import { movieActions } from "./_actions"
import {
  Box,
  Typography,
  Container,
  Skeleton,
  Pagination,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import MovieIcon from "@mui/icons-material/Movie"
import MovieCard from "../components/MovieCard"
import MoviesModal from "../components/MoviesModal"

import "../styles/MoviesPage.scss"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
}

interface MoviesPageProps {
  type: "trending" | "popular" | "top_rated"
}

export default function MoviesPage({ type }: MoviesPageProps) {
  const dispatch = useDispatch()
  const { trending, popular, top_rated, loading, error } = useSelector(
    (state: any) => state.movies
  )

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const [favorites, setFavorites] = useState<Set<number>>(new Set())
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const paginatedTypes = ["popular", "top_rated", "upcoming", "nowPlaying"]

  // Dynamic content based on type
  const pageConfig = {
    trending: {
      title: "Trending Movies",
      subtitle: "Discover the hottest movies trending this week",
      icon: <TrendingUpIcon sx={{ color: "#ffffff", fontSize: "2rem" }} />,
      action: movieActions.getTrendingMovies,
      data: trending,
    },
    popular: {
      title: "Popular Movies",
      subtitle: "Explore the most popular movies of all time",
      icon: <MovieIcon sx={{ color: "#ffffff", fontSize: "2rem" }} />,
      action: movieActions.getPopularMovies,
      data: popular,
    },
    top_rated: {
      title: "Top Rated Movies",
      subtitle: "Browse the highest rated movies by audiences",
      icon: <MovieIcon sx={{ color: "#ffffff", fontSize: "2rem" }} />,
      action: movieActions.getTopRated,
      data: top_rated,
    },
  }

  const config = pageConfig[type]
  const movies = config.data?.movies || []
  const totalPages = config.data?.totalPages || 0

  useEffect(() => {
    // get movies whenever type or page changes
    dispatch<any>(config.action(currentPage))
  }, [dispatch, type, config.action, currentPage])

  const handleToggleFavorite = (movieId: number) => {
    setFavorites((prev) => {
      const updated = new Set(prev)
      updated.has(movieId) ? updated.delete(movieId) : updated.add(movieId)
      return updated
    })
  }

  const handleMovieClick = (movie: any) => {
    setSelectedMovie(movie)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setSelectedMovie(null)
    setModalOpen(false)
  }

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const renderLoadingSkeletons = () => (
    <div className="movies-grid">
      {Array.from({ length: 20 }).map((_, index) => (
        <div key={index} className="loading-item">
          <Skeleton
            variant="rectangular"
            height={300}
            className="loading-skeleton"
            data-testid="skeleton"
          />
          <Skeleton variant="text" height={24} className="loading-text" />
        </div>
      ))}
    </div>
  )

  return (
    <Box className="movies-page">
      <Container maxWidth="xl" className="page-container">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          key={type}
        >
          <Box className="page-header">
            <Box className="header-icon">{config.icon}</Box>
            <Box className="header-content">
              <Typography
                variant={isMobile ? "h4" : "h3"}
                className="page-title"
              >
                {config.title}
              </Typography>
              <Typography variant="body1" className="page-subtitle">
                {config.subtitle}
              </Typography>
            </Box>
            {movies && (
              <Chip
                label={`${movies.length} Movies`}
                className="movies-count-chip"
              />
            )}
          </Box>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait" key={type + currentPage}>
          {loading ? (
            <motion.div
              key={`loading-${type}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="content-section"
            >
              {renderLoadingSkeletons()}
            </motion.div>
          ) : error ? (
            <motion.div
              key={`error-${type}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="content-section"
            >
              <Box className="error-box">
                <Typography variant="h5" className="error-title">
                  Oops! Something went wrong
                </Typography>
                <Typography variant="body1">
                  Unable to load {type} movies. Please try again later.
                </Typography>
              </Box>
            </motion.div>
          ) : !movies || movies.length === 0 ? (
            <motion.div
              key={`empty-${type}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="content-section"
            >
              <Typography className="no-movies-message">
                No {type} movies found.
              </Typography>
            </motion.div>
          ) : (
            <motion.div
              key={`content-${type}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="content-section"
            >
              {/* Movies Grid */}
              <div className="movies-grid">
                {movies.map((movie: any) => (
                  <motion.div
                    key={movie.id}
                    variants={cardVariants}
                    className="movie-item"
                  >
                    <MovieCard
                      movie={movie}
                      favorites={favorites}
                      onToggleFavorite={handleToggleFavorite}
                      onClick={handleMovieClick}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {paginatedTypes.includes(type) && totalPages > 1 && (
                <Box className="pagination-container">
                  <Box className="pagination-wrapper">
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={handlePageChange}
                      size={isMobile ? "medium" : "large"}
                      className="custom-pagination"
                    />
                  </Box>
                </Box>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Movies Modal */}
        <MoviesModal
          movie={selectedMovie}
          open={modalOpen}
          onClose={handleCloseModal}
        />
      </Container>
    </Box>
  )
}
