import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
        {
            label: 'Movies',
            icon: 'fa fa-angle-down',
            disabled: true
        },
        {
          label: 'Theatres',
          icon: 'fa fa-angle-down',
          disabled: true
      }
    ];
  }

  //Clear the session
  logOut(){
    localStorage.removeItem('currentUser');
    localStorage.removeItem('MYSESSIONID');
    this.router.navigateByUrl('/');
  }

}
