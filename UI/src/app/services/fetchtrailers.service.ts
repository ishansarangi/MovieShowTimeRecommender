import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FetchtrailersService {

  endPoint = 'http://localhost:8081/api/getTrailers';
  httpOptions = {
    headers: new HttpHeaders({ 'Authorization': 'Basic bW92aWVyZWNvbW1lbmRlcjpzM2N1ciFU' })
  };
  constructor(private http: HttpClient) { }

  fetchTrailers(){
    return this.http.get(this.endPoint,this.httpOptions);
  }
}
