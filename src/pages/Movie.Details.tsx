import React, { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Box, Typography, CircularProgress } from "@mui/material"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import ScheduleIcon from "@mui/icons-material/Schedule"
import StarIcon from "@mui/icons-material/Star"
import { movieActions } from "./_actions"
import "../styles/MovieDetails.scss"
import "../styles/MovieCard.scss"

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { movie, credits, videos, similarMovies, loading, error } = useSelector(
    (state: any) => state.movies
  )

  useEffect(() => {
    if (!id) return

    dispatch<any>(movieActions.getMovieDetails(id))
    dispatch<any>(movieActions.getMovieCredits(id))
    dispatch<any>(movieActions.getMovieVideos(id))
    dispatch<any>(movieActions.getSimilarMovies(id))
  }, [dispatch, id])

  if (loading) return <CircularProgress />

  if (error) return <Typography>{error}</Typography>

  if (!movie) return <Typography>Movie not found.</Typography>

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.png"

  const trailer = videos?.find(
    (v: any) => v.type === "Trailer" || v.name.toLowerCase().includes("trailer")
  )

  const handleMovieClick = (movieId: number) => {
    navigate(`/movies/${movieId}`)
  }

  const formatRuntime = (minutes: number) => {
    const hrs = Math.floor(minutes / 60) // 156 / 60 = 2
    const mins = minutes % 60 // 156 % 60 = 36
    return `${hrs}h ${mins}m`
  }

  return (
    <Box className="movie-details-container">
      {/* Poster and Info Layout */}
      <Box display="flex" gap={4}>
        {/* Poster Sidebar */}
        <Box
          className="poster-sidebar"
          sx={{ width: "30%", minWidth: "300px" }}
        >
          <img
            src={posterUrl}
            alt={movie.title}
            style={{ width: "100%", borderRadius: 8 }}
          />
        </Box>

        {/* Main Content */}
        <Box
          className="main-content"
          sx={{ width: "70%", paddingRight: "20px" }}
        >
          <Typography variant="h3" className="movie-title">
            {movie.title}
          </Typography>
          {movie.tagline && (
            <Typography variant="subtitle1" className="movie-tagline">
              "{movie.tagline}"
            </Typography>
          )}

          <Box
            mt={2}
            className="rating"
            display="flex"
            alignItems="center"
            gap={2}
          >
            <Box className="rating-item star-rating">
              <Typography variant="body2" style={{ marginRight: "8px" }}>
                <StarIcon style={{ color: "#f5c518" }} />
              </Typography>
              <Typography variant="h6" style={{ fontWeight: "bold" }}>
                {movie.vote_average?.toFixed(1)}
              </Typography>
            </Box>
            <Typography variant="body2" className="rating-item genre">
              {movie.genres?.[0]?.name || "Drama"}
            </Typography>
            <Typography variant="body2" className="rating-item year">
              <CalendarTodayIcon /> {movie.release_date?.slice(0, 4) || "2024"}
            </Typography>
            <Typography variant="body2" className="rating-item runtime">
              <ScheduleIcon />
              {movie.runtime ? formatRuntime(movie.runtime) : "N/A"}
            </Typography>
          </Box>

          <Typography mt={2} variant="body1" className="overview">
            <p>OVERVIEW</p>
            {movie.overview}
          </Typography>

          <Box mt={2} className="info-card">
            <Typography variant="body2">
              Director:{" "}
              {credits?.crew?.find((c: any) => c.job === "Director")?.name ||
                "N/A"}
            </Typography>
            <Typography variant="body2">
              Writers:{" "}
              {credits?.crew
                ?.filter((c: any) => c.job === "Writer")
                .map((w: any) => w.name)
                .join(", ") || "N/A"}
            </Typography>
            <Typography variant="body2">
              Language: {movie.original_language?.toUpperCase()}
            </Typography>
            <Typography variant="body2">
              Country: {movie.production_countries?.[0]?.name || "N/A"}
            </Typography>
          </Box>

          {/* Trailer */}
          <Box mt={2} className="trailer">
            <Typography variant="h6">Trailer:</Typography>
            {trailer ? (
              <Box mt={2} className="trailer-player">
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title={trailer.name || "Official Trailer"}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </Box>
            ) : (
              <Typography variant="body2">No trailer available.</Typography>
            )}
          </Box>
        </Box>
      </Box>

      {/* Box Office & Stats Section */}
      <Box mt={4} className="stats-section">
        <Typography variant="h6">Box Office & Stats</Typography>
        <Box mt={2} className="info-card" display="flex" gap={4}>
          <Typography variant="body2">
            Budget: ${movie.budget?.toLocaleString() || "N/A"}
          </Typography>
          <Typography variant="body2">
            Revenue: ${movie.revenue?.toLocaleString() || "N/A"}
          </Typography>
          <Typography variant="body2">Status: {movie.status}</Typography>
          <Typography variant="body2">
            Runtime: {movie.runtime ? formatRuntime(movie.runtime) : "N/A"}
          </Typography>
        </Box>
      </Box>

      {/* Cast Section */}
      {credits?.cast?.length > 0 && (
        <Box mt={4} className="cast">
          <Typography variant="h6">Cast:</Typography>
          <Box className="movie-section">
            <Box className="movies-row">
              {credits.cast.slice(0, 9).map((actor: any) => (
                <Box key={actor.id} className="movie-card">
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w400${actor.profile_path}`
                        : "/placeholder-profile.png"
                    }
                    alt={actor.name}
                    style={{ width: "100%", borderRadius: 4 }}
                  />
                  <Typography variant="body2" className="card-text">
                    {actor.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    className="card-text"
                    style={{ fontStyle: "italic" }}
                  >
                    as {actor.character}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      )}

      {/* Similar Movies Section */}
      {similarMovies?.length > 0 && (
        <Box mt={4} className="similar-movies">
          <Typography variant="h6">Similar Movies:</Typography>
          <Box className="movie-section">
            <Box className="movies-row">
              {similarMovies.slice(0, 3).map((similar: any) => (
                <Box
                  key={similar.id}
                  className="movie-card"
                  onClick={() => handleMovieClick(similar.id)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={
                      similar.poster_path
                        ? `https://image.tmdb.org/t/p/w400${similar.poster_path}`
                        : "/placeholder-similar.png"
                    }
                    alt={similar.title}
                    style={{ width: "100%", borderRadius: 8 }}
                  />
                  <Typography variant="body2" className="card-text">
                    {similar.title}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default MovieDetails
