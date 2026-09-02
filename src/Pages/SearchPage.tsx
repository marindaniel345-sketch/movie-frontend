import { useState, useEffect } from "react";
import { Movie } from "../Types/Movie";
import { SearchBar } from "../Components/SearchBar.tsx";
import { searchMovies } from "../Services/movieService.ts";
import { MovieCard } from "../Components/MovieCard.tsx";
import { addToWatchlist } from "../Services/watchlistService.ts";
import { Loading } from "../Components/Loading.tsx";
import "../Css/SearchPage.css";

export function SearchPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const movieType = "action";

  useEffect(() => {
    searchMovies(movieType)
      .then((results) => {
        setMovies(results);
      })
      .catch((err) => {
        setError("An error occurred while searching for movies.");
      });
  }, []);

  async function handleSearch(name: string) {
    setLoading(true);
    setError("");
    setHasSearched(true);
    try {
      if (name === "") {
        const results = await searchMovies(movieType);
        setMovies(results);
      } else {
        const results = await searchMovies(name);
        setMovies(results);
      }
    } catch (err) {
      setError("An error occurred while searching for movies.");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddToWatchlist(movie: Movie) {
    await addToWatchlist(movie.id);
  }

  return (
    <div>
      <div className="header">
        <button
          onClick={() => {
            window.location.href = "/my-watchlist";
          }}
        >
          Watchlist
        </button>
      </div>
      <SearchBar onSearch={handleSearch} />

      {loading ? (
        <Loading />
      ) : error ? (
        <p>{error}</p>
      ) : hasSearched && movies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onAddToWatchlist={handleAddToWatchlist}
              onDetails={() => {
                window.location.href = `/movie/${movie.id}`;
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
