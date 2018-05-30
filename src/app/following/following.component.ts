import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
import { MyFireService } from '../shared/myfire.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit, OnDestroy {
  postList: any[] = [];
  refArray: firebase.database.Reference[] = [];

  constructor(private myFire: MyFireService) { }

  ngOnInit() {
    const uid = firebase.auth().currentUser.uid;
    const followRef = firebase.database().ref('follow').child(uid);
    const uidListofOtherUsers: string[] = [];

    followRef.once('value')
      .then(dataSnapshot => {
        dataSnapshot.forEach(childSnapshot => {
          uidListofOtherUsers.push(childSnapshot.key);
        });

        this.getPostsFromOtherUsers(uidListofOtherUsers);
      });
  }

  getPostsFromOtherUsers(uidList: string[]) {
    uidList.forEach((uid, index) => {
      this.refArray[index] = this.myFire.getUserPostsRef(uid);
      this.refArray[index].on('child_added', data => {
        this.postList.push({
          key: data.key,
          data: data.val()
        });
      });
    });
  }

  ngOnDestroy(): void {
    this.refArray.forEach(ref => {
      ref.off();
    });
  }
}
