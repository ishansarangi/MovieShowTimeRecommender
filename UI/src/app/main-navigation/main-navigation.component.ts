import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.css']
})
export class MainNavigationComponent implements OnInit {

  items: MenuItem[];
  displayLogin: boolean = false;
  displaySignup: boolean = false;

    showDialog( buttonType) {
      if(buttonType ==='login'){
        this.displaySignup = false;
        this.displayLogin = true;
      }        
      else{
        this.displaySignup = true;
        this.displayLogin = false;
      } 
    }

  constructor() { }

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

}
