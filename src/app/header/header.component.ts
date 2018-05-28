import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;
  name: string;
  uid: string;
  email: string;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.userService.statusChange.subscribe(userData => {
      if (userData) {
        this.name = userData.name;
        this.uid = userData.uid;
        this.email = userData.email;
      } else {
        this.name = null;
        this.uid = null;
        this.email = null;
      }
    });

    firebase.auth().onIdTokenChanged(user => {
      if (user && user.emailVerified) {
        this.isLoggedIn = true;
        const userData = this.userService.getProfile();
        if (userData && userData.name) {
          this.name = userData.name;
          this.uid = userData.uid;
          this.email = userData.email;
        }
        this.router.navigate(['/all-posts']);
      } else {
        this.isLoggedIn = false;
        firebase.auth().signOut();
      }
    });
  }

  onLogout(): void {
    firebase.auth().signOut()
    .then( _ => {
      this.userService.destroy();
      this.isLoggedIn = false;
    });
  }

}
