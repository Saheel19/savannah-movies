import React, { useEffect, useMemo, useCallback, useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  Chip,
  IconButton,
  Rating,
  CircularProgress,
} from "@mui/material"
import {
  Close as CloseIcon,
  PlayArrow as PlayIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Star as StarIcon,
  CalendarToday as CalendarIcon,
  Language as LanguageIcon,
  Visibility as ViewIcon,
  ThumbUp as ThumbUpIcon,
} from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { movieService } from "../pages/_services"
import "../styles/MoviesModal.scss"

interface MoviesModalProps {
  movie: any | null
  open: boolean
  onClose: () => void
  favorites?: Set<number>
  onToggleFavorite?: (movieId: number) => void
  autoPlayTrailer?: boolean
}

const MoviesModal = React.memo(
  ({
    movie,
    open,
    onClose,
    favorites = new Set(),
    onToggleFavorite,
    autoPlayTrailer = false,
  }: MoviesModalProps) => {
    const [isLoading, setIsLoading] = useState(true)
    const [trailerKey, setTrailerKey] = useState<string | null>(null)
    const navigate = useNavigate()

    // Reset trailerKey whenever modal closes
    useEffect(() => {
      if (!open) {
        setTrailerKey(null)
      }
    }, [open])

    const posterUrl = useMemo(
      () =>
        movie?.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "/placeholder.png",
      [movie]
    )
    const backdropUrl = useMemo(
      () =>
        movie?.backdrop_path
          ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
          : posterUrl,
      [movie, posterUrl]
    )

    // Preload images
    useEffect(() => {
      if (!movie || !open) {
        setIsLoading(false)
        return
      }
      let loadedImages = 0
      const images = [posterUrl, backdropUrl]
      const totalImages = images.length
      const timeoutId = setTimeout(() => setIsLoading(false), 5000)

      images.forEach((src) => {
        const img = new Image()
        img.src = src
        img.loading = "lazy"
        img.onload = img.onerror = () => {
          loadedImages += 1
          if (loadedImages === totalImages) {
            clearTimeout(timeoutId)
            setIsLoading(false)
          }
        }
      })

      return () => clearTimeout(timeoutId)
    }, [movie, posterUrl, backdropUrl, open])

    // Auto play trailer when opening
    useEffect(() => {
      if (autoPlayTrailer && movie && open) {
        handleTrailerClick()
      }
    }, [autoPlayTrailer, movie, open])

    const handleFavoriteClick = useCallback(() => {
      if (onToggleFavorite && movie) onToggleFavorite(movie.id)
    }, [onToggleFavorite, movie?.id])

    const formatDate = useCallback((dateString: string) => {
      if (!dateString) return "N/A"
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    }, [])

    const handleTrailerClick = useCallback(async () => {
      if (!movie) return
      try {
        const data = await movieService.getMovieVideos(movie.id)
        const trailer =
          data.results.find(
            (vid: any) => vid.type === "Trailer" && vid.site === "YouTube"
          ) || data.results.find((vid: any) => vid.site === "YouTube")
        if (trailer) setTrailerKey(trailer.key)
      } catch (err) {
        console.error("Error geting trailer:", err)
      }
    }, [movie])

    const handleBackToDetails = useCallback(() => {
      setTrailerKey(null)
    }, [])

    if (!movie || !open) return null

    const isFavorite = favorites.has(movie.id)

    return (
      <>
        {/* Backdrop */}
        <div
          className="modal-backdrop"
          style={{
            display: isLoading ? "none" : "block",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            zIndex: 1300,
          }}
          onClick={onClose}
        />

        <div
          className="modal-motion-wrapper"
          style={{
            display: isLoading ? "none" : "block",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: 900,
            maxHeight: "90vh",
            overflowY: "auto",
            zIndex: 1400,
          }}
        >
          {isLoading ? (
            <Box className="loader-container">
              <CircularProgress size={60} sx={{ color: "#bb86fc" }} />
            </Box>
          ) : (
            <Dialog
              open={true}
              onClose={onClose}
              maxWidth={false}
              className="movies-modal"
              PaperProps={{ className: "modal-paper" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <Box className="modal-header">
                <div className="backdrop-container">
                  <img
                    src={backdropUrl}
                    alt={movie.title}
                    className="backdrop-image"
                    loading="lazy"
                  />
                  <div className="backdrop-overlay" />
                </div>

                <IconButton
                  className="close-button"
                  onClick={onClose}
                  size="large"
                >
                  <CloseIcon />
                </IconButton>

                <DialogTitle className="modal-title">
                  <Typography
                    variant="h4"
                    component="h1"
                    className="title-text"
                  >
                    {movie.title}
                  </Typography>

                  {movie.tagline && (
                    <Typography variant="subtitle1" className="tagline-text">
                      "{movie.tagline}"
                    </Typography>
                  )}

                  <Box className="rating-section">
                    <Rating
                      value={movie.vote_average / 2}
                      precision={0.1}
                      readOnly
                      icon={<StarIcon className="star-filled" />}
                      emptyIcon={<StarIcon className="star-empty" />}
                      size="large"
                    />
                    <Typography variant="body1" className="rating-text">
                      {movie.vote_average?.toFixed(1)}/10
                    </Typography>
                  </Box>
                </DialogTitle>
              </Box>

              {/* Trailer OR Movie Details */}
              <DialogContent className="modal-content">
                {trailerKey ? (
                  <Box className="trailer-container">
                    <iframe
                      width="100%"
                      height="500"
                      src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                      title="Movie Trailer"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </Box>
                ) : (
                  <Box className="content-layout">
                    <Box className="poster-section">
                      <div className="poster-container">
                        <img
                          src={posterUrl}
                          alt={movie.title}
                          className="poster-image"
                          loading="lazy"
                        />
                      </div>
                    </Box>

                    <Box className="details-section">
                      <Box className="info-grid">
                        <Box className="info-item">
                          <CalendarIcon className="info-icon" />
                          <Box>
                            <Typography variant="body2" className="info-label">
                              Release Date
                            </Typography>
                            <Typography variant="body1" className="info-value">
                              {formatDate(movie.release_date)}
                            </Typography>
                          </Box>
                        </Box>

                        <Box className="info-item">
                          <LanguageIcon className="info-icon" />
                          <Box>
                            <Typography variant="body2" className="info-label">
                              Language
                            </Typography>
                            <Typography variant="body1" className="info-value">
                              {movie.original_language?.toUpperCase() || "N/A"}
                            </Typography>
                          </Box>
                        </Box>

                        <Box className="info-item">
                          <ViewIcon className="info-icon" />
                          <Box>
                            <Typography variant="body2" className="info-label">
                              Popularity
                            </Typography>
                            <Typography variant="body1" className="info-value">
                              {Math.round(movie.popularity || 0)}
                            </Typography>
                          </Box>
                        </Box>

                        <Box className="info-item">
                          <ThumbUpIcon className="info-icon" />
                          <Box>
                            <Typography variant="body2" className="info-label">
                              Votes
                            </Typography>
                            <Typography variant="body1" className="info-value">
                              {movie.vote_count?.toLocaleString() || "N/A"}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>

                      <Box className="overview-section">
                        <Typography variant="h6" className="section-title">
                          Overview
                        </Typography>
                        <Typography variant="body1" className="overview-text">
                          {movie.overview || "No overview available."}
                        </Typography>
                      </Box>

                      <Box className="chips-section">
                        <div className="chip-container">
                          <Chip
                            label={`★ ${movie.vote_average?.toFixed(1) || "N/A"}`}
                            className="rating-chip"
                          />
                        </div>

                        <div className="chip-container">
                          <Chip
                            label={`${movie.vote_count?.toLocaleString() || "0"} votes`}
                            className="votes-chip"
                          />
                        </div>

                        <div className="chip-container">
                          <Chip
                            label={`Popularity: ${Math.round(movie.popularity || 0)}`}
                            className="popularity-chip"
                          />
                        </div>

                        {movie.adult && (
                          <div className="chip-container">
                            <Chip label="18+" className="adult-chip" />
                          </div>
                        )}
                      </Box>
                    </Box>
                  </Box>
                )}
              </DialogContent>

              {/* Actions */}
              <DialogActions className="modal-actions">
                {trailerKey ? (
                  <div className="actions-container">
                    <Button
                      className="action-button secondary"
                      variant="outlined"
                      onClick={handleBackToDetails}
                    >
                      Back to Details
                    </Button>
                  </div>
                ) : (
                  <div className="actions-container">
                    <Button
                      onClick={() => {
                        onClose()
                        navigate(`/movies/${movie.id}`)
                      }}
                      variant="outlined"
                      className="action-button secondary"
                    >
                      Show More
                    </Button>

                    {onToggleFavorite && (
                      <Button
                        onClick={handleFavoriteClick}
                        variant="outlined"
                        startIcon={
                          isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />
                        }
                        className={`action-button favorite ${isFavorite ? "favorited" : ""}`}
                      >
                        {isFavorite
                          ? "Remove from Favorites"
                          : "Add to Favorites"}
                      </Button>
                    )}

                    <Button
                      variant="contained"
                      startIcon={<PlayIcon />}
                      className="action-button primary"
                      onClick={handleTrailerClick}
                    >
                      Watch Trailer
                    </Button>
                  </div>
                )}
              </DialogActions>
            </Dialog>
          )}
        </div>
      </>
    )
  }
)

export default MoviesModal
