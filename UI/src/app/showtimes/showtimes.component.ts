import { Component, OnInit } from '@angular/core';
import { ShowtimesService } from '../services/showtimes.service';
import { RecommendationService } from '../services/recommendation.service';
import { RatingsService } from '../services/ratings.service';
import { CookieService } from 'ngx-cookie-service';
import { ThetreDetails } from './theatres';
import { Shows } from "./shows"
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Router } from '@angular/router';
import { MoviesDetails } from "../movie-details/movie";
import { User } from "../_models/user";
@Component({
  selector: 'app-showtimes',
  templateUrl: './showtimes.component.html',
  styleUrls: ['./showtimes.component.css']
})
export class ShowtimesComponent implements OnInit {
  moviePoster: String;
  backgroundPoster: String;
  movieName: String;
  movieDesc:  String;
  movieId: String;
  displayTrailer: boolean;
  trailer: String;
  movies: MoviesDetails[];
  ratings: String;
  user:User;
  showRecom = false;
  movieStyle = {

    'width': '100%',
    'height': '100%',
    'padding': '0px'
  }
  theatreList: Array<Shows>;
  finalTheatreList: Array<Shows> = [];
  filteredShowtimes: Array<ThetreDetails> = [];
  dates: Array<String> = [];
  constructor(private rating:RatingsService, private recommend:RecommendationService,private router:Router,private fetchShows: ShowtimesService,private cookieService:CookieService) {
    this.movieName = this.cookieService.get("movieName");
    this.backgroundPoster = this.cookieService.get("backgroundPoster");
    this.moviePoster = this.cookieService.get("moviePoster");
    this.movieId = this.cookieService.get("movieId");
    this.movieDesc = this.cookieService.get("movieDesc");
    this.moviePoster  = "url(" + this.moviePoster  + ")";
    this.backgroundPoster  = "url(" + this.backgroundPoster  + ")";

    console.log("movie from cookies- " + this.movieName );
        this.fetchShows.fetchShowtimes(this.movieName,this.movieId)
      .subscribe(
        r => {
          console.log(r);
          this.finalTheatreList = r;
          this.trailer = r[0].trailerLink.substr(0,24) + "embed/" + r[0].trailerLink.substr(32);
          //this.trailer = r[0]['trailerLink'].substr(0,24) + "embed/" + r['site'].substr(32);
          for(var i=0;i<this.finalTheatreList.length;i++){
           this.finalTheatreList[i].date = this.finalTheatreList[i].date.substr(8);
           this.dates.push(this.finalTheatreList[i].date);
           this.dates.sort();
           console.log(this.finalTheatreList);
          }
          for(var i=0;i<this.finalTheatreList.length;i++){
            for(var j=0;j<this.finalTheatreList[i].theatreShowDetails.length;j++){
              for(var k=0;k<this.finalTheatreList[i].theatreShowDetails[j].showDetails.length;k++){
                let newDate = this.dateConvert(this.finalTheatreList[i].theatreShowDetails[j].showDetails[k].showTime);
                this.finalTheatreList[i].theatreShowDetails[j].showDetails[k].showTime = newDate;
              }
            }
          }
        }
      )
      this.recommend.fetchRecommendations(this.movieId)
      .subscribe(
        r =>{
          console.log(r);
          this.movies = r["results"];
          if(this.movies.length > 0)
          this.showRecom = true;
          console.log("Recommended" + this.movies);
        }
      );
  }

  ngOnInit() {
  }
  setMyStyle(){
    let style={
      'background-image': this.moviePoster,
      'background-repeat': 'no-repeat',
      'background-size': '100% 100%',
      'padding': '-10',
      // 'width':'100%',
      // 'height':'27em',
      'border-radius':'5px'
   }
   return style;
 }
  setMyStyleTrailer(){
    let style={
      'background-image': this.backgroundPoster,
      'background-repeat': 'no-repeat',
      'background-size': '100% 110%',
      'background-color': '#ffffff',
      'padding': '0',
      'width':'100%',
      'height':'1040%',
      'overflow': 'hidden'
    }
    return style;
  }
  bookPage(link){
    window.open(link);
  }
  showTrailer(){
    this.displayTrailer = true;
  }
  filterDate(date){
    console.log(date);
    this.filteredShowtimes = [];
    for(var i=0;i<this.finalTheatreList.length;i++){
      if(this.finalTheatreList[i].date == date){
        this.filteredShowtimes = this.finalTheatreList[i].theatreShowDetails;
        break;
      }
    }
  }
   dateConvert (time) {
    // Check correct time format and split into components
    time = time.match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); 
  }
  routeMovie(movieName, backgroundPoster, poster,movieDesc,movieId) {
    this.cookieService.set("backgroundPoster", backgroundPoster);
    this.cookieService.set("moviePoster", poster);
    this.cookieService.set("movieName", movieName);
    this.cookieService.set("movieDesc", movieDesc);
    this.cookieService.set("movieId", movieId);
    console.log("From Cookies- " + this.cookieService.get('movieName'));
    this.router.navigateByUrl('/home/showtimes');
    window.location.reload();
  }

  storeRatings(){
    console.log(localStorage.getItem('currentUser').substr(13,6))
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let userName = currentUser['username']; 
    this.rating.storeRating(userName, this.movieId,this.ratings,this.movieName)
    .subscribe(
      r =>{
        console.log(r);
      }
    );
  }

}


