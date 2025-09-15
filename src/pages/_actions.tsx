import { tmdbConstants } from "./_constants"
import { movieService } from "./_services"

export const movieActions = {
  getPopularMovies,
  getTrendingMovies,
}

/**
 * Get Popular Movies
 */
export function getPopularMovies(page = 1) {
  return (dispatch: any) => {
    dispatch(request())

    movieService.getPopular(page).then(
      (data) => {
        dispatch(success(data.results))
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

/**
 * Get Trending Movies
 */
export function getTrendingMovies() {
  return (dispatch: any) => {
    dispatch(request())

    movieService.getTrending().then(
      (data) => {
        dispatch(success(data.results))
        return data
      },
      (error) => {
        dispatch(failure(error))
      }
    )
  }

  function request() {
    return { type: tmdbConstants.GET_TRENDING_REQUEST }
  }
  function success(data: any) {
    return { type: tmdbConstants.GET_TRENDING_SUCCESS, data }
  }
  function failure(error: any) {
    return { type: tmdbConstants.GET_TRENDING_FAILURE, error }
  }
}
