import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { APIResponse } from './_models/apiResponse';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  endpoint = environment.baseUrl + 'login';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<APIResponse> {
    const body = new FormData();
    body.append('username', username)
    body.append('password', password)
    body.append('submit', 'Login');
    return this.http.post<APIResponse>(this.endpoint, body);
  } 

} 