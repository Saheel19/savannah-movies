import { tmdbConstants } from "./_constants"

interface MoviesList {
  movies: any[]
  totalPages: number
}

interface MoviesState {
  loading: boolean
  trending: MoviesList
  popular: MoviesList
  top_rated: MoviesList
  movie: any | null
  credits: any | null
  videos: any | null
  similarMovies: any[]
  error: string | null
}

const initialState: MoviesState = {
  loading: false,
  trending: { movies: [], totalPages: 0 },
  popular: { movies: [], totalPages: 0 },
  top_rated: { movies: [], totalPages: 0 },
  movie: null,
  credits: null,
  videos: null,
  similarMovies: [],
  error: null,
}

export function movieReducer(state = initialState, action: any): MoviesState {
  switch (action.type) {
    // POPULAR
    case tmdbConstants.GET_POPULAR_REQUEST:
      return { ...state, loading: true, error: null }
    case tmdbConstants.GET_POPULAR_SUCCESS:
      return {
        ...state,
        loading: false,
        popular: {
          movies: action.data.movies,
          totalPages: action.data.totalPages,
        },
      }
    case tmdbConstants.GET_POPULAR_FAILURE:
      return { ...state, loading: false, error: action.error }

    // TRENDING
    case tmdbConstants.GET_TRENDING_REQUEST:
      return { ...state, loading: true, error: null }
    case tmdbConstants.GET_TRENDING_SUCCESS:
      return {
        ...state,
        loading: false,
        trending: {
          movies: action.data.movies,
          totalPages: action.data.totalPages,
        },
      }

    // TOP RATED
    case tmdbConstants.GET_TOP_RATED_REQUEST:
      return { ...state, loading: true, error: null }
    case tmdbConstants.GET_TOP_RATED_SUCCESS:
      return {
        ...state,
        loading: false,
        top_rated: {
          movies: action.data.movies,
          totalPages: action.data.totalPages,
        },
      }
    case tmdbConstants.GET_TOP_RATED_FAILURE:
      return { ...state, loading: false, error: action.error }

    case tmdbConstants.GET_TRENDING_FAILURE:
      return { ...state, loading: false, error: action.error }

    case tmdbConstants.GET_MOVIE_DETAILS_REQUEST:
      return { ...state, loading: true, error: null }
    case tmdbConstants.GET_MOVIE_DETAILS_SUCCESS:
      return { ...state, loading: false, movie: action.data }
    case tmdbConstants.GET_MOVIE_DETAILS_FAILURE:
      return { ...state, loading: false, error: action.error }

    case tmdbConstants.GET_MOVIE_CREDITS_REQUEST:
      return { ...state, loading: true, error: null }
    case tmdbConstants.GET_MOVIE_CREDITS_SUCCESS:
      return { ...state, loading: false, credits: action.data }
    case tmdbConstants.GET_MOVIE_CREDITS_FAILURE:
      return { ...state, loading: false, error: action.error }

    case tmdbConstants.GET_MOVIE_VIDEOS_REQUEST:
      return { ...state, loading: true, error: null }
    case tmdbConstants.GET_MOVIE_VIDEOS_SUCCESS:
      return { ...state, loading: false, videos: action.data }
    case tmdbConstants.GET_MOVIE_VIDEOS_FAILURE:
      return { ...state, loading: false, error: action.error }

    case tmdbConstants.GET_SIMILAR_MOVIES_REQUEST:
      return { ...state, loading: true, error: null }
    case tmdbConstants.GET_SIMILAR_MOVIES_SUCCESS:
      return { ...state, loading: false, similarMovies: action.data }
    case tmdbConstants.GET_SIMILAR_MOVIES_FAILURE:
      return { ...state, loading: false, error: action.error }

    default:
      return state
  }
}
