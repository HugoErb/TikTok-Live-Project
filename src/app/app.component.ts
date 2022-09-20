import {
  Component,
} from '@angular/core';
import {
  StatusService
} from './shared/status.service';
import {
  Subscription
} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'socket-test';
  private _docSub!: Subscription;

  countRose: number = 0;
  countWeights: number = 0;
  interval!: NodeJS.Timer;

  constructor(private statusService: StatusService) {}

  ngOnInit() {
    this._docSub = this.statusService.currentDocument.subscribe(gift => {
      console.log("Ajout de " + gift.number + " " + gift.type);
      if (gift.type === "Rose") {
        this.countRose = this.countRose + gift.number;
      } else if (gift.type === "Weights") {
        this.countWeights = this.countWeights + gift.number;
      }
    });
  }

  // ngOnInit() {
  //   this._docSub = this.statusService.currentDocument.subscribe(gift => {
  //     console.log("Ajout de " + gift.number + " " + gift.type);
  //     if (gift.type === "Rose") {
  //       let roseTarget = this.countRose + gift.number;
  //       let intervalTime = this.getInterval(roseTarget);
  //       this.interval = setInterval(() => {
  //         if (this.countRose < roseTarget) {
  //           this.countRose++;
  //         } else {
  //           clearInterval(this.interval);
  //         }
  //       }, intervalTime)
  //     } else if (gift.type === "Weights") {
  //       let weightTarget = this.countWeights + gift.number;
  //       let intervalTime = this.getInterval(weightTarget);
  //       this.interval = setInterval(() => {
  //         if (this.countRose < weightTarget) {
  //           this.countRose++;
  //         } else {
  //           clearInterval(this.interval);
  //         }
  //       }, intervalTime)
  //     }
  //   });
  // }

  getInterval(target: number) {
    let intervalTime = 0;
    if (target < 5) {
      intervalTime = 1000;
    } else if (target < 10) {
      intervalTime = 700;
    } else if (target < 100) {
      intervalTime = 300;
    } else if (target < 1000) {
      intervalTime = 50;
    }
    return intervalTime
  }

  ngOnDestroy() {
    this._docSub.unsubscribe();
  }
}
