import { Component,  OnInit } from '@angular/core';
import { DomSanitizer,SafeValue } from "@angular/platform-browser";
import { GetMoviesService } from "../get-movies.service";
import { MoviesDetails } from "./movie";
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FetchtrailersService } from '../services/fetchtrailers.service'
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movies: MoviesDetails[];
  trailersObj:any;
  displayTrailer:boolean;
  constructor(private sanitizer:DomSanitizer,private getMovies: GetMoviesService, private getTrailers: FetchtrailersService,
    private router: Router, private cookieService: CookieService) {
    console.log("movieName");
    this.getMovies.fetchMovies()
      .subscribe(
        r => {
          this.movies = r["results"];
          console.log(this.movies);
          for(var i =0;i<this.movies.length;i++){
            if(this.movies[i].site!=null){
              this.movies[i].trailerId = this.movies[i].site.substr(0,24) + "embed/" + this.movies[i].site.substr(32);
              console.log(this.movies[i].trailerId);
              
            }
            
          }
        }
      )
  }
  errorMessage: string;
  hasError: boolean;
  ngOnInit() {
    this.displayTrailer = false;
  }
  closeDialog(){
    this.cookieService.set("trailerUrl", "");
    console.log("CLose");
    this.displayTrailer = false;
  }
  routeMovie(movieName, poster,movieDesc) {
    this.cookieService.set("moviePoster", poster);
    this.cookieService.set("movieName", movieName);
    this.cookieService.set("movieDesc", movieDesc);
    console.log("From Cookies- " + this.cookieService.get('movieName'));
    this.router.navigateByUrl('/home/showtimes');
  }
  showTrailer(url){
    console.log("TrailrId: "+url);
    this.cookieService.set("trailerUrl", url);
    console.log("trailerCookieUrl", this.cookieService.get("trailerUrl"));
    this.displayTrailer = true;
  }
  onStateChange(event) {
    console.log('player state', event.data);
  }
}
