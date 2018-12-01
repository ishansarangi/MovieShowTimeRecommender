import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { APIResponse } from '../_models/apiResponse';
import { CookieService } from 'ngx-cookie-service';
import { AlertService } from './alert.service';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient, private cookieService: CookieService, private alertService: AlertService ) { }

    login(username: string, password: string): Observable<HttpResponse<object>>  {
        const body = new FormData();
        body.append('username', username)
        body.append('password', password)
        body.append('submit', 'Login');
        return this.http.post(`${environment.baseUrl}login`, body, {withCredentials: false, observe: 'response' })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                console.log("newAuth"+user);
                if (user && user.status == 200) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    let currentUser = {
                        'username': username,
                        'token': 'MYSESSIONID=' + this.cookieService.get("MYSESSIONID")
                    }    
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    console.log("newAuth"+localStorage.getItem('currentUser'));
                }

                return user;
            }));
    }

    logout(){
        // logout(): Observable<HttpResponse<object>> {
            // return this.http.get(`${environment.baseUrl}logout`,{observe: 'response'})
        //     .pipe(map(response => {
        //         if (response.status == 200){
                    // remove user from local storage to log user out
                    localStorage.removeItem('currentUser');
                    console.log("logged out successfully")
        //         } else {
        //             this.alertService.error(response.statusText);
        //         }
        //         return response;
        //     },
        //     error => {
        //         this.alertService.error(error);
        //     }

        // ))    
    }
}