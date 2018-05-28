import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService, NoticeType } from '../shared/notification.service';
import { MyFireService } from '../shared/myfire.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit, OnDestroy {

  postLists: any = [];
  personalPostsRef: any;

  constructor(private myFire: MyFireService,
    private notifier: NotificationService) { }

  ngOnInit() {

    const uid = firebase.auth().currentUser.uid;
    this.personalPostsRef = this.myFire.getUserPostsRef(uid);
    this.personalPostsRef.on('child_added', data => {
      this.postLists.push({
        key: data.key,
        data: data.val()
      });
    });

  }

  onFileSelection(event) {
    const fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.myFire.uploadFile(file)
        .then(data => {
          this.notifier.display({
            type: NoticeType.Success,
            message: 'Picture ' + data.fileName + ' Successfully uploaded! ' + data.fileUrl
          });
          this.myFire.handleImageUpload(data);
        })
        .catch(err => {
          this.notifier.display({
            type: NoticeType.Error,
            message: err.message
          });
        });
    }
  }

  ngOnDestroy() {
    this.personalPostsRef.off();
  }

}
