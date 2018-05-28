import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit() {
    const config = {
      apiKey: 'AIzaSyB8VdoDKXrU6ZnWhd949_A7mgtwdep6lDY',
      authDomain: 'instagram-2a68a.firebaseapp.com',
      databaseURL: 'https://instagram-2a68a.firebaseio.com',
      projectId: 'instagram-2a68a',
      storageBucket: 'instagram-2a68a.appspot.com',
      messagingSenderId: '30256651494'
    };
    firebase.initializeApp(config);
  }


}
