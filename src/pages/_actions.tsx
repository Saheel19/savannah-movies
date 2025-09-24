import { tmdbConstants } from "./_constants"
import { movieService } from "./_services"

export const movieActions = {
  getPopularMovies,
  getTopRated,
  getTrendingMovies,
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
  getSimilarMovies,
}

/**
 * Get Popular Movies
 */
export function getPopularMovies(page = 1) {
  return (dispatch: any) => {
    dispatch(request())

    movieService.getPopular(page).then(
      (data) => {
        // send the entire response so reducer can extract movies + total_pages
        dispatch(
          success({ movies: data.results, totalPages: data.total_pages })
        )
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
 * Get Popular Movies
 */
export function getTopRated(page = 1) {
  return (dispatch: any) => {
    dispatch(request())

    movieService.getTopRated(page).then(
      (data) => {
        // send the entire response so reducer can extract movies + total_pages
        dispatch(
          success({ movies: data.results, totalPages: data.total_pages })
        )
        return data
      },
      (error) => {
        dispatch(failure(error))
      }
    )
  }

  function request() {
    return { type: tmdbConstants.GET_TOP_RATED_REQUEST }
  }
  function success(data: any) {
    return { type: tmdbConstants.GET_TOP_RATED_SUCCESS, data }
  }
  function failure(error: any) {
    return { type: tmdbConstants.GET_TOP_RATED_FAILURE, error }
  }
}

/**
 * Get Trending Movies
 */
export function getTrendingMovies(page = 1, time_window = "day") {
  return (dispatch: any) => {
    dispatch(request())

    movieService.getTrending(time_window).then(
      (data) => {
        dispatch(
          success({ movies: data.results, totalPages: data.total_pages ?? 0 })
        )
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

/**
 * Get Movie Details by ID
 */

export function getMovieDetails(id: string) {
  return (dispatch: any) => {
    dispatch(request())

    movieService.getMovieDetails(id).then(
      (data) => {
        dispatch(success(data))
        return data
      },
      (error) => {
        dispatch(failure(error))
      }
    )
  }

  function request() {
    return { type: tmdbConstants.GET_MOVIE_DETAILS_REQUEST }
  }
  function success(data: any) {
    return { type: tmdbConstants.GET_MOVIE_DETAILS_SUCCESS, data }
  }
  function failure(error: any) {
    return { type: tmdbConstants.GET_MOVIE_DETAILS_FAILURE, error }
  }
}

/**
 * Get Movie Credits by ID
 */
export function getMovieCredits(id: string) {
  return (dispatch: any) => {
    dispatch(request())
    movieService.getMovieCredits(id).then(
      (data) => {
        dispatch(success(data))
        return data
      },
      (error) => {
        dispatch(failure(error))
      }
    )
  }

  function request() {
    return { type: tmdbConstants.GET_MOVIE_CREDITS_REQUEST }
  }
  function success(data: any) {
    return { type: tmdbConstants.GET_MOVIE_CREDITS_SUCCESS, data }
  }
  function failure(error: any) {
    return { type: tmdbConstants.GET_MOVIE_CREDITS_FAILURE, error }
  }
}

/**
 * Get Movie Videos by ID
 */
export function getMovieVideos(id: string) {
  return (dispatch: any) => {
    dispatch(request())
    movieService.getMovieVideos(id).then(
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
    return { type: tmdbConstants.GET_MOVIE_VIDEOS_REQUEST }
  }
  function success(data: any) {
    return { type: tmdbConstants.GET_MOVIE_VIDEOS_SUCCESS, data }
  }
  function failure(error: any) {
    return { type: tmdbConstants.GET_MOVIE_VIDEOS_FAILURE, error }
  }
}
/**
 * Get Similar Movies by ID
 */
export function getSimilarMovies(id: string) {
  return (dispatch: any) => {
    dispatch(request())
    movieService.getSimilarMovies(id).then(
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
    return { type: tmdbConstants.GET_SIMILAR_MOVIES_REQUEST }
  }
  function success(data: any) {
    return { type: tmdbConstants.GET_SIMILAR_MOVIES_SUCCESS, data }
  }
  function failure(error: any) {
    return { type: tmdbConstants.GET_SIMILAR_MOVIES_FAILURE, error }
  }
}

/**
 * Search Movies by Query
 */
export function searchMovies(query: string) {
  return (dispatch: any) => {
    dispatch(request())

    movieService.searchMovies(query).then(
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
    return { type: tmdbConstants.SEARCH_MOVIES_REQUEST }
  }
  function success(data: any) {
    return { type: tmdbConstants.SEARCH_MOVIES_SUCCESS, data }
  }
  function failure(error: any) {
    return { type: tmdbConstants.SEARCH_MOVIES_FAILURE, error }
  }
}
