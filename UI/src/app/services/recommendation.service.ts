import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  endPoint = environment.baseUrl + 'api/getRecommendedMovies?movieId=';
  httpOptions = {
    headers: new HttpHeaders({ 'Authorization': 'Basic bW92aWVyZWNvbW1lbmRlcjpzM2N1ciFU' })
  };
  
  constructor(private http: HttpClient) { }

  fetchRecommendations(movieId){
    return this.http.post(this.endPoint + movieId,this.httpOptions);
  }
}
