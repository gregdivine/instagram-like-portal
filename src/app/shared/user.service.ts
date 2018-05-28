import { Injectable, EventEmitter } from '@angular/core';


@Injectable()
export class UserService {

    statusChange: any = new EventEmitter<any>();

    set(userFromDatabase) {
        localStorage.setItem('user', JSON.stringify(userFromDatabase));
        this.statusChange.emit(userFromDatabase);
    }

    destroy() {
        localStorage.removeItem('user');
        this.statusChange.emit(null);
    }

    getProfile() {
        const user = localStorage.getItem('user');
        return JSON.parse(user);
    }
}
