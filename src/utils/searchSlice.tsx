import { tmdbConstants } from "pages/_constants"

const initialState = {
  results: [] as any[],
  loading: false,
  error: null as string | null,
}

export function searchReducer(state = initialState, action: any) {
  switch (action.type) {
    case tmdbConstants.SEARCH_MOVIES_REQUEST:
      return { ...state, loading: true, error: null }
    case tmdbConstants.SEARCH_MOVIES_SUCCESS:
      return { ...state, loading: false, results: action.data }
    case tmdbConstants.SEARCH_MOVIES_FAILURE:
      return { ...state, loading: false, error: action.error }
    default:
      return state
  }
}
