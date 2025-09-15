import { JSX, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { movieActions } from "./_actions"
import Navigation from "../components/Navigation"
import { Box, Typography } from "@mui/material"
import WhatshotIcon from "@mui/icons-material/Whatshot"
import MovieIcon from "@mui/icons-material/Movie"
import MovieCard from "../components/MovieCard"
import MoviesModal from "../components/MoviesModal"
import "../styles/Home.scss"

export default function Home() {
  const dispatch = useDispatch()
  const { trending, popular, loading, error } = useSelector(
    (state: any) => state.movies
  )

  const [favorites, setFavorites] = useState<Set<number>>(new Set())
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    dispatch<any>(movieActions.getTrendingMovies())
    dispatch<any>(movieActions.getPopularMovies())
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

  if (loading) return <Typography>Loading movies...</Typography>
  if (error) return <Typography color="error">Error: {error}</Typography>

  const renderSection = (title: string, icon: JSX.Element, movies: any[]) => {
    if (!movies || movies.length === 0) {
      return (
        <Box className="movie-section">
          <Box className="section-header">
            {icon}
            <Typography variant="h6">{title}</Typography>
          </Box>
          <Typography color="text.secondary">No movies found.</Typography>
        </Box>
      )
    }

    return (
      <Box className="movie-section">
        <Box className="section-header">
          {icon}
          <Typography variant="h6">{title}</Typography>
        </Box>
        <Box className="movies-row">
          {movies.map((movie: any) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onClick={handleMovieClick}
            />
          ))}
        </Box>
      </Box>
    )
  }

  return (
    <Box className="home-page">
      <Navigation
        currentPage="popular"
        searchQuery=""
        onNavClick={() => {}}
        onSearch={() => {}}
      />
      {renderSection(
        "Trending This Week",
        <WhatshotIcon color="error" />,
        trending
      )}
      {renderSection("Popular Movies", <MovieIcon color="primary" />, popular)}

      <MoviesModal
        movie={selectedMovie}
        open={modalOpen}
        onClose={handleCloseModal}
      />
    </Box>
  )
}
