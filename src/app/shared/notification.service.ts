import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class NotificationService {
    private sub = new Subject<NoticeData>();

    public emitter = this.sub.asObservable();

    display(notice: NoticeData) {
        this.sub.next(notice);
    }
}

export interface NoticeData {
    type: NoticeType;
    message: string;
}

export enum NoticeType {
    None,
    Success,
    Error
}
