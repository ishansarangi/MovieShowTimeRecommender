import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-home-navigation',
  templateUrl: './home-navigation.component.html',
  styleUrls: ['./home-navigation.component.css']
})
export class HomeNavigationComponent implements OnInit {

  
  items: MenuItem[];
  displayProfile: boolean = false;

  showProfile( ) {
    this.displayProfile = true;
    console.log("Fetched.");
  }

  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit() {
  }

  //Clear the session
  logOut(){
    this.authService.logout();//.subscribe(r=>{
    //   if (r.status == 200){
        this.router.navigateByUrl('/');
    //   }
    // })
  }

}
