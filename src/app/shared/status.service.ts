import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';

@Injectable({
    providedIn: 'root'
})
export class StatusService {
    private statusUrl = '/api/status';
    currentDocument = this.socket.fromEvent<any>('document');

    constructor(private http: HttpClient, private socket: Socket) { }

    // Error handling
    private error(error: any) {
        let message = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(message);
    }
}
