import { Movie } from "../Types/Movie";
interface WatchlistCardProps {
    movie: Movie;
    status: number;
    addedAt: string;
    onDelete?: () => void;
    onStatusChange?: (status: number) => void;
}
export function WatchlistCard({ movie, status, addedAt, onDelete, onStatusChange }: WatchlistCardProps) {
    const statuses = ["To Watch", "Watching", "Watched"];
 return (
    <div>
        <h2>{movie.title}</h2>
        <img
    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
    alt={movie.title}
/>
        <p>Status: {statuses[status]}</p>
        <p>Added: {new Date(addedAt).toLocaleDateString()}</p>
        <button onClick={onDelete}>Delete</button>
        status: <select value={status} onChange={(e) => onStatusChange?.(Number(e.target.value))}>
            <option value={0}>To Watch</option>
            <option value={1}>Watching</option>
            <option value={2}>Watched</option>
        
        </select>
    </div>
)};