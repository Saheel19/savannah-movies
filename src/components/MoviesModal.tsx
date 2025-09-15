import React from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  Chip,
} from "@mui/material"

interface MoviesModalProps {
  movie: any | null
  open: boolean
  onClose: () => void
}

export default function MoviesModal({
  movie,
  open,
  onClose,
}: MoviesModalProps) {
  if (!movie) return null

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{movie.title}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
          {movie.poster_path && (
            <Box flexShrink={0}>
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                style={{ borderRadius: 8, width: 200 }}
              />
            </Box>
          )}

          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Release Date: {movie.release_date || "N/A"}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Language: {movie.original_language.toUpperCase()}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {movie.overview}
            </Typography>

            <Box mt={2} display="flex" gap={1} flexWrap="wrap">
              <Chip label={`Popularity: ${movie.popularity}`} />
              <Chip label={`Rating: ${movie.vote_average}`} />
              <Chip label={`Votes: ${movie.vote_count}`} />
              {movie.adult && <Chip label="18+" color="error" />}
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
