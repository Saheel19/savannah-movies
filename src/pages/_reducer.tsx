import { tmdbConstants } from "./_constants"

interface MoviesState {
  loading: boolean
  movies: any[]
  error: string | null
}

const initialState: MoviesState = {
  loading: false,
  movies: [],
  error: null,
}

export function movieReducer(state = initialState, action: any) {
  switch (action.type) {
    case tmdbConstants.GET_POPULAR_REQUEST:
      return { ...state, loading: true, error: null }

    case tmdbConstants.GET_POPULAR_SUCCESS:
      return { ...state, loading: false, movies: action.data }

    case tmdbConstants.GET_POPULAR_FAILURE:
      return { ...state, loading: false, error: action.error }

    default:
      return state
  }
}
