import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Login } from '../login';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  authToken:any;
  user : any;
  httpOptions={
    headers:new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(private http:HttpClient) { }

  registerUser(user):Observable<Login>{

    var headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.post<Login>(environment.baseUrl + 'register/user/newUser', user, this.httpOptions);
  }
}
