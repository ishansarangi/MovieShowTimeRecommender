import { Component,  OnInit } from '@angular/core';
import { DomSanitizer,SafeValue } from "@angular/platform-browser";
import { GetMoviesService } from "../get-movies.service";
import { MoviesDetails } from "./movie";
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FetchtrailersService } from '../services/fetchtrailers.service'
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
template: string = `<img class="custom-spinner-template" src="http://pa1.narvii.com/5722/2c617cd9674417d272084884b61e4bb7dd5f0b15_hq.gif">`
  movies: MoviesDetails[];
  topRatedMovies: MoviesDetails[];
  popularMovies: MoviesDetails[];

  isLoaded: Boolean = false;
  isMoviesLoaded: Boolean = false;
  isPopularMoviesLoaded: Boolean = false;
  isTopRatedMoviesLoaded: Boolean = false;

  constructor(private sanitizer:DomSanitizer,private getMovies: GetMoviesService, private getTrailers: FetchtrailersService,
    private router: Router, private route: ActivatedRoute, private cookieService: CookieService, private spinnerService: Ng4LoadingSpinnerService) {
    console.log("movieName");

    this.getMovies.fetchMovies()
      .subscribe(
        r => {
          this.movies = r["results"];
          this.isMoviesLoaded = true;
          this.isLoaded = this.isMoviesLoaded && this.isPopularMoviesLoaded && this.isTopRatedMoviesLoaded;
          console.log(this.movies);
        }
      )
    this.getMovies.fetchPopularMovies()
      .subscribe(
        r => {
          this.popularMovies = r["results"];
          this.isPopularMoviesLoaded = true;
          this.isLoaded = this.isMoviesLoaded && this.isPopularMoviesLoaded && this.isTopRatedMoviesLoaded;
          console.log(this.movies);
        }
      )
    this.getMovies.fetchTopRatedMovies()
      .subscribe(
        r => {
          this.topRatedMovies = r["results"];
          this.isTopRatedMoviesLoaded = true;
          this.isLoaded = this.isMoviesLoaded && this.isPopularMoviesLoaded && this.isTopRatedMoviesLoaded;
          console.log(this.movies);
        }
      )
  }
  errorMessage: string;
  hasError: boolean;

  ngOnInit() {

    this.spinnerService.show();
  }
  
  closeDialog(){
    this.cookieService.set("trailerUrl", "");
    console.log("CLose");

  }

  routeMovie(movieName,backgroundPoster,poster,movieDesc,movieId) {
    this.cookieService.set("backgroundPoster", backgroundPoster);
    this.cookieService.set("moviePoster", poster);
    this.cookieService.set("movieName", movieName);
    this.cookieService.set("movieDesc", movieDesc);
    this.cookieService.set("movieId", movieId);
    console.log("From Cookies- " + this.cookieService.get('movieName'));
    this.router.navigateByUrl('/home/showtimes');
  }
  
  onStateChange(event) {
    console.log('player state', event.data);
  }
}
