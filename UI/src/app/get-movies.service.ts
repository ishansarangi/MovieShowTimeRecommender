import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GetMoviesService {

  endPoint = environment.baseUrl + 'api/getMovies?type=';

  httpOptions = {
    headers: new HttpHeaders({ 'Authorization': 'Basic bW92aWVyZWNvbW1lbmRlcjpzM2N1ciFU'})
  };

  constructor(private http: HttpClient) { }

  fetchMovies(){
    return this.http.post(this.endPoint+MovieCategory.nowPlaying,this.httpOptions);
  }
  fetchPopularMovies(){
    return this.http.post(this.endPoint+MovieCategory.popular,this.httpOptions);
  }
  fetchTopRatedMovies(){
    return this.http.post(this.endPoint+MovieCategory.topRated,this.httpOptions);
  }
}

enum MovieCategory{
  nowPlaying = 'nowplaying',
  topRated = 'toprated',
  popular = 'popular'
}
