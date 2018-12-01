import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Rating } from '../_models/ratingModel'
@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  endPoint = environment.baseUrl + 'users/rating';
  httpOptions={
    headers:new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(private http: HttpClient) { }

  
  storeRating(userId, movieId, rating, movieName){
    let rate = new Rating();
    rate.movieId = movieId;
    rate.movieName = movieName;
    rate.rating = rating;
    rate.userName = userId;
    this.endPoint = this.endPoint.concat("?movieName=") + movieName + "&movieId=" + movieId + "&userName=" + userId + "&rating=" + rating;
    console.log(this.endPoint);
    return this.http.post(this.endPoint,rate,this.httpOptions);
  }
}
