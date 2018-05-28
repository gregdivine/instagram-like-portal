import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationService, NoticeType } from '../../shared/notification.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { MyFireService } from '../../shared/myfire.service';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private notifier: NotificationService,
              private router: Router,
              private myFire: MyFireService,
              private userSevice: UserService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        if (user.emailVerified) {
           this.router.navigate(['/all-posts']);
          return this.myFire.getUserFromDatabase(user.uid);
        } else {
          firebase.auth().signOut();
          this.notifier.display({
            type: NoticeType.Error,
            message: 'Please verify your email.'
          });
        }
      }).then (userDataFromDatabase => {
          if (userDataFromDatabase) {
            this.userSevice.set(userDataFromDatabase);
          }
        })
      .catch(err => {
        this.notifier.display({
          type: NoticeType.Error,
          message: err.message
        });
      }
      );
  }

}
