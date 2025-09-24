import { JSX, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { movieActions } from "./_actions"
import { Box, Typography, Container, Skeleton, Button } from "@mui/material"
import MovieIcon from "@mui/icons-material/Movie"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import MovieCard from "../components/MovieCard"
import MoviesModal from "../components/MoviesModal"
import { RootState } from "store/store"

import "../styles/Home.scss"

// Animation variants for grid/cards
const gridVariants = {
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

export default function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { trending, popular, top_rated, loading } = useSelector(
    (state: RootState) => state.movies
  )

  const [favorites, setFavorites] = useState<Set<number>>(new Set())
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  // Hero slider auto-play (only first 5 popular movies)
  useEffect(() => {
    if (typeof window === "undefined") return
    if (popular.movies && popular.movies.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide(
          (prev) => (prev + 1) % Math.min(popular.movies.length, 5)
        )
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [popular.movies])

  useEffect(() => {
    dispatch<any>(movieActions.getTrendingMovies())
    dispatch<any>(movieActions.getPopularMovies())
    dispatch<any>(movieActions.getTopRated())
  }, [dispatch])

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

  const handleShowMore = (type: "trending" | "popular" | "top_rated") => {
    navigate(`/movies/${type}`)
  }

  const getImageUrl = (path: string) => {
    return path
      ? `https://image.tmdb.org/t/p/original${path}`
      : "https://via.placeholder.com/1920x1080?text=No+Image"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).getFullYear()
  }

  // ---------------- HERO SLIDER ----------------
  const renderHeroSlider = () => {
    if (!popular.movies || popular.movies.length === 0) return null
    const slidesToShow = popular.movies.slice(0, 5)

    return (
      <div className="hero-slider-section">
        <div className="slider-container">
          {slidesToShow.map((movie: any, index: number) => (
            <motion.div
              key={movie.id}
              className={`slide ${index === currentSlide ? "active" : ""}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentSlide ? 1 : 0 }}
              transition={{ duration: 1 }}
            >
              <div
                className="slide-background"
                style={{
                  backgroundImage: `url(${getImageUrl(movie.backdrop_path)})`,
                }}
              >
                <motion.div
                  className="slide-content"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{
                    x: index === currentSlide ? 0 : -100,
                    opacity: index === currentSlide ? 1 : 0,
                  }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h1 className="movie-title">{movie.title}</h1>
                  <p className="movie-overview">{movie.overview}</p>

                  <div className="movie-info">
                    <div className="info-item">
                      <span className="label">Release</span>
                      <span className="value">
                        {formatDate(movie.release_date)}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="label">Rating</span>
                      <span className="value">
                        {movie.vote_average?.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  <div className="action-buttons">
                    <motion.button
                      className="info-btn"
                      onClick={() => handleMovieClick(movie)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <InfoOutlinedIcon sx={{ marginRight: 1 }} />
                      More Info
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="slider-indicators">
          {slidesToShow.map((_: any, index: number) => (
            <motion.div
              key={index}
              className={`indicator ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    )
  }

  // ---------------- MOVIE SECTIONS ----------------
  const renderSection = (
    title: string,
    icon: JSX.Element,
    movies: any[],
    type: "trending" | "popular" | "top_rated"
  ) => {
    return (
      <Container className="section-container">
        <Box className="section-header">
          <Box className="section-header-left">
            {icon}
            <Typography className="section-title">{title}</Typography>
          </Box>

          <motion.div
            className="show-more-btn-container"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              className="show-more-btn"
              onClick={() => handleShowMore(type)}
              endIcon={<ArrowForwardIcon />}
            >
              Show More
            </Button>
          </motion.div>
        </Box>

        <AnimatePresence mode="wait">
          {loading ? (
            <Box className="loading-row">
              {Array.from({ length: 6 }).map((_, idx) => (
                <Skeleton
                  key={idx}
                  variant="rectangular"
                  width={180}
                  height={270}
                  className="loading-skeleton"
                  data-testid="skeleton"
                />
              ))}
            </Box>
          ) : !movies || movies.length === 0 ? (
            <Typography className="no-movies-message">
              No movies found.
            </Typography>
          ) : (
            <motion.div
              className="movies-slider"
              variants={gridVariants}
              initial="hidden"
              animate="visible"
            >
              {movies.map((movie: any) => (
                <motion.div
                  key={movie.id}
                  className="movie-slide"
                  variants={cardVariants}
                >
                  <MovieCard
                    movie={movie}
                    favorites={favorites}
                    onToggleFavorite={handleToggleFavorite}
                    onClick={handleMovieClick}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    )
  }

  return (
    <Box className="home-page">
      {renderHeroSlider()}

      {renderSection(
        "Popular Movies",
        <MovieIcon sx={{ color: "#ffffff", fontSize: "1.5rem" }} />,
        popular.movies.slice(5),
        "popular"
      )}

      {renderSection(
        "Top Rated Movies",
        <MovieIcon sx={{ color: "#ffd700", fontSize: "1.5rem" }} />,
        top_rated.movies.slice(0),
        "top_rated"
      )}

      {renderSection(
        "Trending This Week",
        <TrendingUpIcon sx={{ color: "#ffffff", fontSize: "1.5rem" }} />,
        trending.movies,
        "trending"
      )}

      <MoviesModal
        movie={selectedMovie}
        open={modalOpen}
        onClose={handleCloseModal}
      />
    </Box>
  )
}
