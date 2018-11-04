import { DomSanitizer,SafeValue } from "@angular/platform-browser";
export class MoviesDetails {
    vote: number;
    id: number;
    video: boolean;
    vote_average: any;
    title: String;
    popularity: any;
    poster_path: String;
    original_language: String;
    original_title: String;
    genreIds: number[];
    backdrop_path: String;
    adult: boolean;
    overview: String;
    release_date: String;
    name: String;
    site:String;
    trailerId:string;
    trailer:SafeValue;
}