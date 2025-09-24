import { tmdbConstants } from "pages/_constants"
import { movieService } from "pages/_services"

export function searchMovies(query: string) {
  return (dispatch: any) => {
    dispatch({ type: tmdbConstants.SEARCH_MOVIES_REQUEST })

    movieService.searchMovies(query).then(
      (data) => {
        dispatch({
          type: tmdbConstants.SEARCH_MOVIES_SUCCESS,
          data: data.results,
        })
      },
      (error) => {
        dispatch({ type: tmdbConstants.SEARCH_MOVIES_FAILURE, error })
      }
    )
  }
}
