import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() displayFollowButton = true;

  @Output() favoriteClicked = new EventEmitter<any>();
  @Output() followClicked = new EventEmitter<any>();

  defaultImage = 'http://via.placeholder.com/150x150';
  imageData: any = {};


  constructor() { }

  ngOnInit() {
    const uid = firebase.auth().currentUser.uid;

    firebase.database().ref('images').child(this.imageName)
      .once('value')
      .then((snapshot: firebase.database.DataSnapshot) => {
        this.imageData = snapshot.val();
        this.defaultImage = this.imageData.fileUrl;

        if (this.imageData.uploadedBy.uid === uid) {
          this.displayFavoritesButton = false;
          this.displayFollowButton = false;
        }

      });
  }

  onFavoritesClicked() {
    this.favoriteClicked.emit(this.imageData);
  }

  onFollowClicked() {
    this.followClicked.emit(this.imageData);
  }
}
