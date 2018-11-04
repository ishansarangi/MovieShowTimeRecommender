import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MovieRecommender';

  constructor(private router: Router){
    let userName = localStorage.getItem('currentUser'); 
    let sessionID = localStorage.getItem('MYSESSIONID'); 
    if(userName != null && sessionID != null){
      if (userName.length != 0 && sessionID.length != 0){
        this.router.navigateByUrl('/home');
      }
    }
    
  }
}
