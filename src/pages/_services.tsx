import axios from "axios"

const apiKey = process.env.REACT_APP_TMDB_API_KEY
const baseUrl =
  process.env.REACT_APP_TMDB_BASE_URL || "https://api.themoviedb.org/3"

export const movieService = {
  getPopular,
}

/**
 * Handle responses
 */
const handleResponse = (res: any) => {
  if (res.status === 200) {
    return res.data
  }

  const errorMessage =
    res?.response?.data?.status_message || "Something went wrong!"
  return Promise.reject(errorMessage)
}

/**
 * Get popular movies
 */
function getPopular(page = 1) {
  return axios
    .get(`${baseUrl}/movie/popular?api_key=${apiKey}&page=${page}`)
    .then(handleResponse)
}
