import { tmdbConstants } from "./_constants"

interface MoviesState {
  loading: boolean
  trending: any[]
  popular: any[]
  movie: any | null
  credits: any | null
  videos: any | null
  similarMovies: any[]
  error: string | null
}

const initialState: MoviesState = {
  loading: false,
  trending: [],
  popular: [],
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
        popular: action.data.results ?? action.data,
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
        trending: action.data.results ?? action.data,
      }
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
