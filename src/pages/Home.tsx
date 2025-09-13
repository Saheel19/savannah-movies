import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { movieActions } from "./_actions"

export default function Home() {
  const dispatch = useDispatch()
  const { loading, movies, error } = useSelector((state: any) => state.movies)

  useEffect(() => {
    dispatch<any>(movieActions.getPopularMovies())
  }, [dispatch])

  if (loading) return <p>Loading popular movies...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h2>Popular Movies</h2>
      <ul>
        {movies.map((movie: any) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  )
}
