import { Component, OnInit } from '@angular/core';
import { ShowtimesService } from '../services/showtimes.service'
import { CookieService } from 'ngx-cookie-service';
import { ThetreDetails } from './theatres';
import { Showtimes } from "./showtimes"
import { analyzeAndValidateNgModules } from '@angular/compiler';
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
  movieStyle = {

    'width': '60%',
    'height': '100%',
    'padding': '0px'
  }
  theatreList: Array<ThetreDetails>;
  finalTheatreList: Array<ThetreDetails> = [];
  index:number;
  constructor(private fetchShows: ShowtimesService,private cookieService:CookieService) {
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
          console.log(r['cinemas']);
          this.theatreList = r['cinemas'];
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
              
          }
        }
      )
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
  bookPage(link){

  }
  showTrailer(){
    this.displayTrailer = true;
    console.log("Done Trailers");
  }

}
