import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router){
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      if (currentUser) {
        console.log(currentUser)
        this.router.navigateByUrl('/home/movies');
      }
    }
  }

  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if ((currentUser && currentUser.token) == false) {
        this.router.navigateByUrl('/');
    }

  }

}
