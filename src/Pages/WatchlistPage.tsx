import { useState, useEffect } from "react";
import { deleteWatchList, getWatchlist, updateWatchlist } from "../Services/watchlistService.ts";
import { getMovieDetails } from "../Services/movieService.ts";
import { Loading } from "../Components/Loading.tsx";
import "../Css/WatchlistPage.css";
import { Movie } from "../Types/Movie.ts";

export function WatchlistPage() {
    const [watchlist, setWatchlist] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [filter, setFilter] = useState<number | undefined>(undefined);

    useEffect(() => {
        async function loadWatchlist() {
            setLoading(true);
            try {
                const data = await getWatchlist(filter);

                const detailedWatchlist = await Promise.all(
                    data.map(async (item) => {
                        const movieDetails = await getMovieDetails(item.movieId);
                        return { ...item, movie: movieDetails };
                    })
                );
                setWatchlist(detailedWatchlist);
            } catch (err) {
                setError("An error occurred while loading the watchlist.");
            } finally {
                setLoading(false);
            }
        }

        loadWatchlist();
    }, [filter]);

    async function handleDelete(id: string) {
        await deleteWatchList(id);
        setWatchlist((current) => current.filter((item) => item.id !== id));
    }

    async function handleStatusChange(id: string, newStatus: number) {
        await updateWatchlist(id, newStatus);
        setWatchlist((current) =>
            current.map((item) =>
                item.id === id ? { ...item, status: newStatus } : item
            )
        );
    }

    return (
        <div className="watchlist-container">
          
            <div className="filter-bar">
                <select
                    className="filter-select"
                    value={filter ?? ""}
                    onChange={(e) =>
                        setFilter(e.target.value === "" ? undefined : Number(e.target.value))
                    }
                >
                    <option value="">All Movies</option>
                    <option value="0">Want to Watch</option>
                    <option value="1">Watching</option>
                    <option value="2">Watched</option>
                </select>
            </div>

            {loading ? (
                <Loading />
            ) : error ? (
                <p className="status-message">{error}</p>
            ) : watchlist.length === 0 ? (
                <p className="status-message">Watchlist is empty.</p>
            ) : (
                <div className="movie-grid">
                    {watchlist.map((item) => (
                        <WatchlistCard
                            key={item.id}
                            movie={item.movie}
                            status={item.status}
                            addedAt={item.addedAt}
                            onDelete={() => handleDelete(item.id)}
                            onStatusChange={(newStatus) =>
                                handleStatusChange(item.id, newStatus)
                            }
                        />
                    ))}
                </div>
            )}
        </div>
    );
}


interface WatchlistCardProps {
    movie: Movie;
    status: number;
    addedAt: string;
    onDelete?: () => void;
    onStatusChange?: (status: number) => void;
}

export function WatchlistCard({ movie, status, addedAt, onDelete, onStatusChange }: WatchlistCardProps) {
    return (
        <div className="movie-card">
            <h3>{movie.title}</h3>
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />
            
            {/* Dropdown status stilizat identic */}
            <select
                value={status}
                onChange={(e) => onStatusChange?.(Number(e.target.value))}
            >
                <option value={0}>To Watch</option>
                <option value={1}>Watching</option>
                <option value={2}>Watched</option>
            </select>

            <p className="movie-overview">Added: {new Date(addedAt).toLocaleDateString()}</p>

            <div className="movie-buttons">
                <button className="add-to-watchlist" onClick={onDelete}>
                    Delete
                </button>
            </div>
        </div>
    );
}