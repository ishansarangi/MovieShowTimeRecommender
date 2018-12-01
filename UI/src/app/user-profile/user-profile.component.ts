import { Component, OnInit } from '@angular/core';
import { ViewProfileService } from '../services/view-profile.service';
import { Router } from '@angular/router';
import { User } from '../_models';
import { FlashMessagesService } from 'angular2-flash-messages'
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User = new User();

  display: boolean = false;
  userMessage: String = "";
  validated: boolean = false;

  isEditing: boolean = false;
  isSubmitVisible: boolean = false;
  
  buttonName: String = "Edit Profile";

  constructor(private api: ViewProfileService, private router: Router,private flashMessage:FlashMessagesService) { }

  ngOnInit() {
    this.api.fetchUserDetails().subscribe(
      response => {
        if (response) {
          this.user = response;
          this.user.userDOB = new Date(this.user.userDOB)
        } 
        console.log(response);
      },
      responseError => {
        this.flashMessage.show("Server error: Something went wrong!", { cssClass: 'alert-danger'});
      }
    )

  }

  editProfileFields() {
    this.isSubmitVisible = true;
    this.isEditing = true;
  }

  profileValidation() {
    console.log(this.userMessage);

    this.userMessage = "";
    if (this.user.userContactNo.length != 10) {
      this.flashMessage.show("Please enter a 10 digit Mobile Number!", { cssClass: 'alert-danger'});

    }
    else if (this.user.firstName.length == 0) {
      this.flashMessage.show("Please enter a valid FirstName!", { cssClass: 'alert-danger'});
    }

    else if (this.user.lastName.length == 0) {
      this.flashMessage.show("Please enter a valid LastName!", { cssClass: 'alert-danger'});
    }

    else if (this.user.userName.length == 0) {
      this.flashMessage.show("Please enter a valid UserName!", { cssClass: 'alert-danger'});
    }

    else if (!this.validateEmail(this.user.userEmailId) || this.user.userEmailId.length == 0) {
      this.flashMessage.show("Please enter a valid email!", { cssClass: 'alert-danger'});
    }
    else {
      this.api.editProfileWith(this.user).subscribe(
        response => {
          if (response.success) {
            this.flashMessage.show("User details updated successfully!", { cssClass: 'alert-success'});
            console.log(response);
          }

          else {
            console.log(response);
          }
        },
        responseError => {
          this.flashMessage.show("Server error: User details update failed!", { cssClass: 'alert-danger'});
        }
      )
    }
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

}
