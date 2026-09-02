import { useParams } from "react-router-dom";
import { Movie } from "../Types/Movie";
import { useEffect, useState } from "react";
import { addToWatchlist, getWatchlist } from "../Services/watchlistService.ts";
import { getMovieDetails } from "../Services/movieService.ts";
import { Loading } from "../Components/Loading.tsx";
import "../Css/MovieDetailsPage.css";

export function MovieDetailsPage() {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [isInWatchlist, setIsInWatchlist] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    useEffect(() => {
        async function checkWatchlist() {
            if (movie) {
                const watchlist = await getWatchlist();
                console.log("Movie ID:", movie.id);
                console.log("Watchlist:", watchlist);
                const isInList = watchlist.some(
                    (item) => item.movieId === movie.id
                );
                console.log("Is in list:", isInList);
                setIsInWatchlist(isInList);
                
                
            }
        }

        checkWatchlist();
    }, [movie]);
    const { id } = useParams();
    useEffect(() => {
        async function loadMovie() {
            if (id) {
                setLoading(true);
                try{
                    const data = await getMovieDetails(Number(id));
                    setMovie(data);
                }
                catch (err) {
                    setError("An error occurred while loading the movie details.");
                }
                finally {
                    setLoading(false);
                }
                
            }
        }

        loadMovie();
    }, [id]);
    async function handleAddToWatchlist() {
        if(movie){
            try{
                await addToWatchlist(movie.id);
                setIsInWatchlist(true);
            }
            catch (err) {
                setError("An error occurred while adding the movie to the watchlist.");
            }
        }
    }
    console.log("isInWatchlist state:", isInWatchlist);
    return (
        <div className="movie-card">
            {loading ? (
                <Loading />
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <h1>{movie?.title}</h1>

                    <p>{movie?.overview}</p>

                    <p>Year: {movie?.release_date}</p>

                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                        alt={movie?.title}
                    />

                    <p>Genres: {movie?.genres?.map((genre) => genre.name).join(", ")}</p>

                    {isInWatchlist ? (
                        <p>Already in Watchlist</p>
                    ) : (
                        <button onClick={handleAddToWatchlist}>
                            Add to Watchlist
                        </button>
                    )}
                </>
            )}
        </div>
    );
}