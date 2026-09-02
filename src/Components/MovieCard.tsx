import { Movie } from "../Types/Movie";

interface MovieCardProps {
    movie: Movie;
    onAddToWatchlist?: (movie: Movie) => void;
    onDelete?: () => void;
    onDetails?: () => void;
    status?: number;
    onStatusChange?: (status: number) => void;
}

export function MovieCard({
    movie,
    onAddToWatchlist,
    onDelete,
    onDetails,
    status,
    onStatusChange
}: MovieCardProps) {
    return (
        <div className="movie-card">
            <h3>{movie.title}</h3>

            {status === 0 && <p>Status: To Watch</p>}
            {status === 1 && <p>Status: Watching</p>}
            {status === 2 && <p>Status: Watched</p>}

            <select
                className="movie-status"
                onChange={(e) => onStatusChange?.(Number(e.target.value))}
            >
                <option value={0}>To Watch</option>
                <option value={1}>Watching</option>
                <option value={2}>Watched</option>
            </select>

            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />

            <p className="movie-overview">{movie.overview}</p>
            <p>Year: {movie.release_date.substring(0, 4)}</p>

            <div className="movie-buttons">
                {onAddToWatchlist && (
                    <button className="add-to-watchlist" onClick={() => {
                        onAddToWatchlist(movie);
                    }}>
                        Add to Watchlist
                    </button>
                )}

                {onDelete && (
                    <button className="delete-button" onClick={onDelete}>
                        Remove
                    </button>
                )}

                {onDetails && (
                    <button className="details-button" onClick={onDetails}>
                        View Details
                    </button>
                )}
            </div>
        </div>
    );
}