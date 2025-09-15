import axios from "axios"

const apiKey = process.env.REACT_APP_TMDB_API_KEY
const baseUrl =
  process.env.REACT_APP_TMDB_BASE_URL || "https://api.themoviedb.org/3"

export const movieService = {
  getPopular,
  getTrending,
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
 * @param page
 */
function getPopular(page = 1) {
  return axios
    .get(`${baseUrl}/movie/popular`, {
      params: {
        page,
        api_key: apiKey,
      },
    })
    .then(handleResponse)
}

/**
 * Get trending movies
 * @param time_window
 */
function getTrending(time_window = "day") {
  return axios
    .get(`${baseUrl}/trending/movie/${time_window}`, {
      params: {
        api_key: apiKey,
      },
    })
    .then(handleResponse)
}
