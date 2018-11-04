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
    this.movieDesc = this.cookieService.get("movieDesc");
    this.moviePoster  = "url(" + this.moviePoster  + ")";

    console.log("movie from cookies- " + this.movieName );
        this.fetchShows.fetchShowtimes(this.movieName)
      .subscribe(
        r => {
          console.log(r['cinemas']);
          this.theatreList = r['cinemas'];
          
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
    //this.moviePoster = "http://image.tmdb.org/t/p/w154/bURIWlkMbzT8RdpemzCmQECo2Uh.jpg";
    //this.movieName = "Venom";
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

}
