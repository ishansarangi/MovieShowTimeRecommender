import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router){
    let userName = localStorage.getItem('currentUser'); 
    // TODO
    // let sessionID = localStorage.getItem('MYSESSIONID'); 
    if(userName != null){ //&& sessionID != null){
      if (userName.length != 0 ){ //&& sessionID.length != 0){
        this.router.navigateByUrl('/home');
      }
    }
  }

  ngOnInit() {
  }

}
