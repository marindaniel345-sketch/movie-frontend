export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    release_date: string;
    test_commit_wrong_property: string;
    averageRating: number;
    totalViews: number;
}