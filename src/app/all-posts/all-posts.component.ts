import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
import { MyFireService } from '../shared/myfire.service';
import { NotificationService, NoticeType } from '../shared/notification.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit, OnDestroy {

  all: Array<any> = [];
  allRef: any;
  loadMoreRef: any;

  constructor(private myFire: MyFireService, private notifier: NotificationService) { }

  ngOnInit() {
    this.allRef = firebase.database().ref('allposts').limitToFirst(3);
    this.allRef.on('child_added', data => {
      this.all.push({
        key: data.key,
        data: data.val()
      });
    });
  }

  onLoadMore() {
    if (this.all.length > 0) {
      const lastLoadedPost = this.all[this.all.length - 1];
      const lastLoaddPostKey = lastLoadedPost.key;

      this.loadMoreRef = firebase.database().ref('allposts').startAt(null, lastLoaddPostKey).limitToFirst(3 + 1);
      this.loadMoreRef.on('child_added', data => {
        if (data.key === lastLoaddPostKey) {
          return;
        } else {
          this.all.push({
            key: data.key,
            data: data.val()
          });
        }
      });
    }
  }

  ngOnDestroy() {
    this.allRef.off();
    if (this.loadMoreRef) {
      this.loadMoreRef.off();
    }
  }

  onFavoritesClicked(imageData) {
    this.myFire.handleFavoriteClicked(imageData)
      .then(data => {
        this.notifier.display({
          type: NoticeType.Success,
          message: 'Image added to favorites'
        });
      })
      .catch(err => {
        this.notifier.display({
          type: NoticeType.Error,
          message: 'Error addeding image to favorites'
        });
      });
  }

  onFollowClicked(imageData) {
    this.myFire.followUser(imageData)
    .then(data => {
      this.notifier.display({
        type: NoticeType.Success,
        message: 'Following ' + imageData.uploadedBy.name + '!!!'
      });
    })
    .catch(err => {
      this.notifier.display({
        type: NoticeType.Error,
        message: err
      });
    });
  }
}
