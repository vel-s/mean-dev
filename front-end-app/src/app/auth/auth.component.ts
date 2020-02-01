import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from "angular2-flash-messages";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  login: String;
  password: String;

  constructor(
    private flashMessages: FlashMessagesService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  userLoginClick() {
    const user = {
      login: this.login,
      password: this.password
    };

    if(!user.password) {
      this.flashMessages.show('Enter the password, please...', {
        cssClass: 'alert-danger',
        timeout: 1000
      });
      return false;
    }

    this.authService.authUser(user).subscribe(data => {
      if (!data.success) {
        this.flashMessages.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 1000
        });
      } else {
        this.flashMessages.show('Success authorization', {
          cssClass: 'alert-success',
          timeout: 500
        } );
        this.router.navigate(['dashboard']);
        this.authService.storeUser(data.token, data.user);
      }
    })
  }

}
