import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable, Subject, throwError} from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ShowtimesService {

  endPoint = environment.baseUrl + 'api/getShowtimes?movieName=';
  httpOptions = {
    headers: new HttpHeaders({ 'Authorization': 'Basic bW92aWVyZWNvbW1lbmRlcjpzM2N1ciFU' })
  };

  constructor(private http: HttpClient) { }

  fetchShowtimes( movieName,movieId): Observable<any>{
    return this.http.post(this.endPoint + movieName + "&movieId=" + movieId,this.httpOptions);
  }
}
