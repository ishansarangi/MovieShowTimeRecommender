import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ShowtimesService {

  endPoint = environment.baseUrl + 'api/getShowtimes';
  httpOptions = {
    headers: new HttpHeaders({ 'Authorization': 'Basic bW92aWVyZWNvbW1lbmRlcjpzM2N1ciFU' })
  };

  constructor(private http: HttpClient) { }

  fetchShowtimes( movieName,movieId){
    console.log("Fetch" + movieName);
    this.endPoint = this.endPoint.concat("?movieName=") + movieName + "&movieId=" + movieId;
    return this.http.post(this.endPoint,this.httpOptions);
  }
}
