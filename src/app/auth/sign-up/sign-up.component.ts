import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';
import { NotificationService, NoticeType } from '../../shared/notification.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private notifier: NotificationService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const fullname = form.value.fullname;
    const email = form.value.email;
    const password = form.value.password;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        user.sendEmailVerification();
        const message = `A verification email has been sent to ${email}. Please check your inbox and follow instructions.`;
        this.notifier.display({
          type: NoticeType.Success,
          message: message
        });
        return firebase.database().ref('users/' + user.uid).set({
          email: email,
          uid: user.uid,
          registrationDate: new Date().toString(),
          name: fullname
        })
        .then(_ => {
          firebase.auth().signOut();
        });
      })
      .catch(err => {
        this.notifier.display({
          type: NoticeType.Error,
          message: err.message
        });
      });
  }

}

