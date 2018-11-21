import { Component, OnInit, OnDestroy } from '@angular/core';
import {LoginService} from '../login.service';
import {Router, ActivatedRoute} from '@angular/router';
import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {
  username: string;
  userPassword: string;
  errorMessage: string;
  hasError: boolean;
  loading = false;
  returnUrl: string;

  constructor(private api: LoginService, private router: Router, private route: ActivatedRoute, private authenticationService: AuthenticationService) { }

  ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home/movies';
  }

  ngOnDestroy(){
    // this.returnUrl = null;
  }

  performLogin(){
    this.errorMessage = '';
    this.hasError = false;
    this.validateUserName();
    this.validatePassword();
    if (!this.hasError){
      this.loading = true;
      this.authenticationService.login(
        this.username,
        this.userPassword
      )
        .subscribe(
          r => {
            console.log(r)
            if (r.status == 200) {
              // this.router.navigateByUrl('/home/movies');
              this.router.navigateByUrl(this.returnUrl);
            } else {
              alert(console.error());
              this.loading = false;
            }
          },
          r => {
            console.log(r)
            alert(r.errorMessage);
            this.loading = false;
          }
        );
      
    }
  }

  validateUserName(){
    if (this.username.length == 0) {
      this.hasError = true;
      this.errorMessage = "Please enter a valid UserName!";
      alert(this.errorMessage);
    }
  }
  
  validatePassword(){
    if (this.userPassword.length == 0) {
      this.hasError = true;
      this.errorMessage = "Please enter the password!";
      alert(this.errorMessage);
    }
  }

}
