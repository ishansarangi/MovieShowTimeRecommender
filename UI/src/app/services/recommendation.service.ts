import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  endPoint = environment.baseUrl + 'api/getRecommendedMovies';
  httpOptions = {
    headers: new HttpHeaders({ 'Authorization': 'Basic bW92aWVyZWNvbW1lbmRlcjpzM2N1ciFU' })
  };
  constructor(private http: HttpClient) { }

  fetchRecommendations(movieId){

    this.endPoint = this.endPoint.concat("?movieId=") + movieId;
    return this.http.post(this.endPoint,this.httpOptions);
  }
}
