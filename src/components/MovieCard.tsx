import React from "react"
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
} from "@mui/material"
import { Favorite, FavoriteBorder, Star } from "@mui/icons-material"
import { motion } from "framer-motion"
import "../styles/MovieCard.scss"

interface MovieCardProps {
  movie: {
    id: number
    title: string
    poster_path: string | null
    release_date: string
    vote_average: number
    overview: string
  }
  favorites: Set<number>
  onToggleFavorite: (movieId: number) => void
  onClick: (movie: any) => void
  className?: string
}

const MotionCard = motion.create(Card)

export default function MovieCard({
  movie,
  favorites,
  onToggleFavorite,
  onClick,
  className = "",
}: MovieCardProps) {
  const isFavorite = favorites.has(movie.id)
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.png"

  const handleCardClick = () => {
    onClick(movie)
  }

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onToggleFavorite(movie.id)
  }

  return (
    <MotionCard
      className={`movie-card ${className}`}
      onClick={handleCardClick}
      whileHover={{
        scale: 1.05,
        y: -8,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Box className="movie-card-container">
        <CardMedia
          component="img"
          image={posterUrl}
          alt={movie.title}
          className="movie-media"
        />

        {/* Overlay that appears on hover */}
        <Box className="movie-overlay">
          <Box className="movie-rating">
            <Star className="star-icon" />
            <Typography variant="body2" className="rating-text">
              {movie.vote_average.toFixed(1)}
            </Typography>
          </Box>
        </Box>

        {/* Favorite button */}
        <IconButton
          className="favorite-button"
          onClick={handleFavoriteClick}
          size="small"
        >
          {isFavorite ? (
            <Favorite className="favorite-icon favorited" />
          ) : (
            <FavoriteBorder className="favorite-icon" />
          )}
        </IconButton>

        <CardContent className="movie-content">
          <Typography
            className="movie-title"
            variant="body1"
            component="h3"
            title={movie.title}
          >
            {movie.title}
          </Typography>
          <Typography className="movie-date" variant="body2">
            {new Date(movie.release_date).getFullYear()}
          </Typography>
        </CardContent>
      </Box>
    </MotionCard>
  )
}
