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
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
        }}
      >
        {movies.map((movie: any) => (
          <li key={movie.id} style={{ listStyle: "none", textAlign: "center" }}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              style={{ borderRadius: "8px", width: "50%" }}
            />
            <p>{movie.title}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
