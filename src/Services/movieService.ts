import { Movie } from "../Types/Movie";
export async function searchMovies( name:string ):Promise<Movie[]>{
    const response = await fetch( `http://localhost:5090/api/movies/search?name=${name}`);
     const data = await response.json();
    return data.results;
}
export async function getMovieDetails(externalId: number): Promise<Movie> {
     const response = await fetch( `http://localhost:5090/api/movies/${externalId}`);
     const data = await response.json();
    return data;
}