import { useState } from "react";
import { Movie } from "../Types/Movie";
import { SearchBar } from "../Components/SearchBar.tsx";
import { searchMovies } from "../Services/movieService.ts";
import { MovieCard } from "../Components/MovieCard.tsx";
import { addToWatchlist } from "../Services/watchlistService.ts";
export function SearchPage() {
    const [movies, setMovies] = useState<Movie[]>([]);
 async function handleSearch(name: string) {
    console.log("Caut:", name);

    const results = await searchMovies(name);

    console.log("Rezultate:", results);

    setMovies(results);
}
async function handleAddToWatchlist(movie: Movie) {
    await addToWatchlist(movie.id);
}
    return (
        <div>
            <SearchBar onSearch={handleSearch} />
       {movies.map((movie) => (
    <MovieCard
        key={movie.id}
        movie={movie}
        onAddToWatchlist={handleAddToWatchlist}
    />
))}
        </div>
    );
}