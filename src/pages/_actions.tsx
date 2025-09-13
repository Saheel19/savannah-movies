import { tmdbConstants } from "./_constants"
import { movieService } from "./_services"

export const movieActions = {
  getPopularMovies,
}

/**
 * Get Popular Movies
 */
export function getPopularMovies(page = 1) {
  return (dispatch: any) => {
    dispatch(request())

    movieService.getPopular(page).then(
      (data) => {
        dispatch(success(data.results)) // TMDB returns { results: [] }
        return data
      },
      (error) => {
        dispatch(failure(error))
      }
    )
  }

  function request() {
    return { type: tmdbConstants.GET_POPULAR_REQUEST }
  }
  function success(data: any) {
    return { type: tmdbConstants.GET_POPULAR_SUCCESS, data }
  }
  function failure(error: any) {
    return { type: tmdbConstants.GET_POPULAR_FAILURE, error }
  }
}
