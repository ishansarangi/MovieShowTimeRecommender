import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { HttpParamsOptions } from '@angular/common/http/src/params';
import { APIResponse } from '../_models/apiResponse';
import { environment } from 'src/environments/environment';
import { User } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class ViewProfileService {

  httpOptions={
    headers:new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(private http:HttpClient) { }

  fetchUserDetails():Observable<User>{
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let userName = currentUser['username']; 
    return this.http.get<User>(environment.baseUrl + 'profile/fetch/'+userName, this.httpOptions);
  }

  editProfileWith(user: User):Observable<APIResponse>{
    
    var headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    console.log(user);
    return this.http.post<APIResponse>(environment.baseUrl + 'register/user/editUser', user, this.httpOptions);
  }
}
