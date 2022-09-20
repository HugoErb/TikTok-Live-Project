import { Component, OnInit } from '@angular/core';
import {
    Subscription
} from 'rxjs';
import {
    StatusService
} from './../../services/status.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    private _viewerCountSub!: Subscription;
    
    public viewer_count = 0;

    constructor(private statusService: StatusService) { }

    ngOnInit(): void {
        this._viewerCountSub = this.statusService.viewerCount.subscribe(data => {
            console.log("Nombres de viewer = " + data.viewer_count);
            this.viewer_count = data.viewer_count;
        });
    }

    ngOnDestroy() {
        this._viewerCountSub.unsubscribe();
    }

}
