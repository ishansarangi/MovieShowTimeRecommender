import { Component, OnInit } from '@angular/core';
import { RegisterUserService } from '../services/register-user.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages'
import { CustomValidator } from '../_validation';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../_models';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: User = new User();
      
  userMessage: String = "";
  validated: boolean = false;
      
  constructor(private api: RegisterUserService, private router:Router, private flashMessage:FlashMessagesService, private cookieService:CookieService) { }

  onRegisterSubmit(){
      console.log(this.user);
      if(this.user.firstName == undefined || this.user.lastName == undefined || this.user.userAddress == undefined ||
          this.user.userCity == undefined || this.user.userContactNo == undefined || this.user.userDOB == undefined ||
          this.user.userEmailId == undefined || this.user.userName == undefined || this.user.userPassword == undefined ||
          this.user.userPinCode == undefined ){
          this.flashMessage.show("Please fill in all the details", { cssClass: 'alert-danger'});

      } else if(!CustomValidator.validateEmail(this.user.userEmailId)){
          this.flashMessage.show("Please fill in a valid Email Id", { cssClass: 'alert-danger'});

      } else if(!CustomValidator.phoneValidator(this.user.userContactNo)){
          this.flashMessage.show("Please fill in a valid mobile number", { cssClass: 'alert-danger'});

      } else if(!CustomValidator.passwordValidator(this.user.userPassword)){
        this.flashMessage.show("Please fill in a valid password having a minimum of 8 characters, at least 1 capital and small letter and at least 1 numeric and a special character", { cssClass: 'alert-danger'});

      } else {
        console.log(this.user.userDOB.getMonth());//+  "-" + this.user.userDOB.getDate() + "-" + this.user.userDOB.getFullYear());
        this.api.registerUser(this.user).subscribe(
            response => {
              if (response.success){
                console.log(response);
                let currentUser = {
                  'username': this.user.userName,
                  'token': 'MYSESSIONID=' + this.cookieService.get("MYSESSIONID")
                }    
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                console.log("newAuth"+localStorage.getItem('currentUser'));

                this.router.navigateByUrl('/home/movies');

              } else {
                console.log(response);
                this.flashMessage.show(response.errorReason, { cssClass: 'alert-danger'});

              }
            },
            responseError => {
              this.flashMessage.show("Server error: Registration failed!", { cssClass: 'alert-danger'});
              console.log("Server error: Registration failed!");
            }
          )
      }
      
  }

  ngOnInit() {
  }

  

  keyPressForNumbers(event: any) {
      const pattern = /[0-9\+\-\ ]/;
      let inputChar = String.fromCharCode(event.charCode);
      
      if (!pattern.test(inputChar)) {
          // invalid character, prevent input
          event.preventDefault();
      }
  }
}

