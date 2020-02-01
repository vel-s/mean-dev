import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from "angular2-flash-messages";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    // private flashMessages: FlashMessagesService,
    // private router: Router,
    // private authService: AuthService
  ) { }

  ngOnInit() {
  }

  // logoutUser() {
  //   this.authService.logout();
  //   this.flashMessages.show('Exited from Account!', {cssClass: 'alert-warning', timeout: 3000} );
  //   this.router.navigate(['auth']);
  //   return false;
  // }


}
