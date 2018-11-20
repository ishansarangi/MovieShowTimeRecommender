import { Component, OnInit } from '@angular/core';
import { ShowtimesService } from '../services/showtimes.service';
import { RecommendationService } from '../services/recommendation.service';
import { RatingsService } from '../services/ratings.service';
import { CookieService } from 'ngx-cookie-service';
import { ThetreDetails } from './theatres';
import { Showtimes } from "./showtimes";
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Router } from '@angular/router';
import { MoviesDetails } from "../movie-details/movie";
@Component({
  selector: 'app-showtimes',
  templateUrl: './showtimes.component.html',
  styleUrls: ['./showtimes.component.css']
})
export class ShowtimesComponent implements OnInit {
  moviePoster: String;
  movieName: String;
  movieDesc:  String;
  movieId: String;
  displayTrailer: boolean;
  trailer: String;
  movies: MoviesDetails[];
  movieStyle = {

    'width': '100%',
    'height': '100%',
    'padding': '0px'
  }
  theatreList: Array<ThetreDetails>;
  finalTheatreList: Array<ThetreDetails> = [];
  index:number;
  constructor(private router: Router,private fetchShows: ShowtimesService,private recommend: RecommendationService,
    private cookieService:CookieService, private rating: RatingsService) {
    this.movieName = this.cookieService.get("movieName");
    this.moviePoster = this.cookieService.get("moviePoster");
    this.movieId = this.cookieService.get("movieId");
    this.movieDesc = this.cookieService.get("movieDesc");
    this.moviePoster  = "url(" + this.moviePoster  + ")";

    console.log("movie from cookies- " + this.movieName );
        this.fetchShows.fetchShowtimes(this.movieName,this.movieId)
      .subscribe(
        r => {
          console.log(r);
          this.finalTheatreList = r.showtimesByTheatreAndDate
          for(var i=0;i<this.finalTheatreList.length;i++){
            var inner = this.finalTheatreList[i]
            console.log(Object.keys(inner)[0]);
          }
          /*this.theatreList = r['cinemas'];
          this.trailer = r['site'].substr(0,24) + "embed/" + r['site'].substr(32);
          for(this.index=0;this.index<this.theatreList.length;this.index++){
            if(this.theatreList[this.index].movieList != null){
              for(var i=0;i<this.theatreList[this.index].movieList.length;i++){
                this.theatreList[this.index].movieList[i].date = this.theatreList[this.index].movieList[i].start_at.substr(0,10);
                this.theatreList[this.index].movieList[i].time = this.theatreList[this.index].movieList[i].start_at.substr(21,25);
              }
              this.finalTheatreList.push(this.theatreList[this.index]);
             
            }else{
              this.theatreList.splice(this.index,1);
            }
              
          }*/
        }
      )
      this.recommend.fetchRecommendations(this.movieId)
      .subscribe(
        r =>{
          console.log(r);
          this.movies = r["results"];
          console.log(this.movies);
        }
      );
  }

  ngOnInit() {
  }
  setMyStyle(){
    let style={
      'background-image': this.moviePoster,
      'background-repeat': 'no-repeat',
      'background-size': '8em 12em',
      'padding': '0',
      'width':'50em',
      'height':'12em',
      'border-radius':'5px'
   }
   return style;
 }
  setMyStyleTrailer(){
    let style={
      'background-image': this.moviePoster,
      'background-repeat': 'no-repeat',
      'background-size': '100% 25em',
      'padding': '0',
      'width':'100%',
      'height':'30em',
      'border-radius':'5px'
    }
    return style;
  }
  bookPage(link){
    window.open(link);
  }
  showTrailer(){
    this.displayTrailer = true;
    console.log("Done Trailers");
  }
  routeMovie(movieName, poster,movieDesc,movieId) {
    this.cookieService.set("moviePoster", poster);
    this.cookieService.set("movieName", movieName);
    this.cookieService.set("movieDesc", movieDesc);
    this.cookieService.set("movieId", movieId);
    console.log("From Cookies- " + this.cookieService.get('movieName'));
    this.router.navigateByUrl('/home/showtimes');
  }
  storeRatings(){
    this.rating.storeRating(localStorage.getItem('currentUser'), this.movieId,this.rating,this.movieName)
    .subscribe(
      r =>{
        console.log(r);
      }
    );
  }

}
