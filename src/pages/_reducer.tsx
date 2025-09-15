import { tmdbConstants } from "./_constants"

interface MoviesState {
  loading: boolean
  trending: any[]
  popular: any[]
  error: string | null
}

const initialState: MoviesState = {
  loading: false,
  trending: [],
  popular: [],
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

    default:
      return state
  }
}
