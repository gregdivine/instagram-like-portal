import { Component, OnInit } from '@angular/core';
import { NotificationService, NoticeData, NoticeType } from '../shared/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notice: NoticeData = {
    type: NoticeType.None,
    message: null
  };

  public noticeEnum = NoticeType;

  constructor(private notitier: NotificationService) {
    this.notitier.emitter.subscribe(notice => {
      this.notice = notice;
      this.reset();
    });
  }

  ngOnInit() {
  }

  reset() {
    setTimeout(_ => {
      this.notice = {
        type: NoticeType.None,
        message: null
      };
    }, 8000);
  }

}
