import { Movie } from "../Types/Movie";
import { WatchlistItem } from "../Types/WatchlistItem";

export async function getWatchlist(): Promise<WatchlistItem[]>{
    const response = await fetch("http://localhost:5090/api/watchlist");
    const data = await response.json();
    return data;
}
export async function addToWatchlist(externalId: number): Promise<WatchlistItem> {
    console.log("MovieId trimis:", externalId);

    const response = await fetch("http://localhost:5090/api/watchlist", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ movieId: externalId })
    });

    const data = await response.json();
    return data;
}
export async function updateWatchlist(id:string, status:number): Promise<WatchlistItem>{
  const response = await fetch(`http://localhost:5090/api/watchlist/${id}/status`,{
    method: "PUT",
    headers: {
    "Content-Type": "application/json"
},
 body: JSON.stringify({status})
  });
   const data = await response.json();
    return data;
}
export async function deleteWatchList(id:string):Promise<void>{
    const response = await fetch(`http://localhost:5090/api/watchlist/${id}`,{
        method:"DELETE",
    });
  

}