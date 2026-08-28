import { Movie } from "../Types/Movie";

interface MovieCardProps {
    movie: Movie;
    onAddToWatchlist:(movie:Movie)=>void ;
}
export function MovieCard({ movie, onAddToWatchlist }: MovieCardProps) {
    return(
        <div>
            <h3>{movie.title}</h3>
            <img
    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
    alt={movie.title}
    
/>
<p>{movie.overview}</p>
<p>Year: {movie.release_date.substring(0, 4)}</p>
<button onClick={()=>{
    onAddToWatchlist(movie);
}}>
    Add to Watchlist
</button>
        </div>
    );
}