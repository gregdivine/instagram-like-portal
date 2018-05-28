import { Component, OnInit, Input } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() imageName: string;
  @Input() displayPostedBy = true;
  @Input() displayFavoritesButton = true;

  defaultImage = 'http://via.placeholder.com/150x150';
  imageData: any = {};


  constructor() { }

  ngOnInit() {
    firebase.database().ref('images').child(this.imageName)
      .once('value')
      .then((snapshot: firebase.database.DataSnapshot) => {
        this.imageData = snapshot.val();
        this.defaultImage = this.imageData.fileUrl;
      });
  }

}
