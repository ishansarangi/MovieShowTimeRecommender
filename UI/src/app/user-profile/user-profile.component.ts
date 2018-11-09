import { Component, OnInit } from '@angular/core';
import { ViewProfileService } from '../services/view-profile.service';
import { Router } from '@angular/router';
import { User } from '../_models';

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

  constructor(private api: ViewProfileService, private router: Router) { }

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
        this.display = true;
        this.userMessage = "Server error: Something went wrong!";
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
      this.display = true;
      this.userMessage = "Please enter a 10 digit Mobile Number!";
      console.log("mobile");

    }
    else if (this.user.firstName.length == 0) {

      this.display = true;
      this.userMessage = "Please enter a valid FirstName!";
      console.log("fn");
    }

    else if (this.user.lastName.length == 0) {

      this.display = true;
      this.userMessage = "Please enter a valid LastName!";
      console.log("ln");
    }

    else if (this.user.userName.length == 0) {

      this.display = true;
      this.userMessage = "Please enter a valid UserName!";
      console.log("un");
    }

    else if (!this.validateEmail(this.user.userEmailId) || this.user.userEmailId.length == 0) {

      this.display = true;
      this.userMessage = "Please enter a valid email!";
      console.log("mid");
    }

    //TODO: Make date comparison for age and empty date

    // else if (this.user.userDOB.length == 0) {

    //   this.display = true;
    //   this.userMessage = "Please enter a valid Date Of Birth!";
    //   console.log("dob");
    // }
    else {
      this.api.editProfileWith(this.user).subscribe(
        response => {
          if (response.success) {
            console.log(response);
            this.display = true;
            this.userMessage = "User details updated successfully!";
          }

          else {
            console.log(response);
          }
        },
        responseError => {
          this.display = true;
          this.userMessage = "Server error: Registration failed!";
        }
      )
    }
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

}
