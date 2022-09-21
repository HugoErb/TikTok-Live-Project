import {
  Component,
  OnInit
} from '@angular/core';
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
  private _maxViewerCountSub!: Subscription;
  private _likeCountSub!: Subscription;
  private _followerCountSub!: Subscription;
  private _subCountSub!: Subscription;
  private _shareCountSub!: Subscription;
  private _commentCountSub!: Subscription;
  private _giftCountSub!: Subscription;
  private _coinCountSub!: Subscription;
  private _joinCountSub!: Subscription;

  private ratioRevenu = 0.01285714286;

  public viewer_count = 0;
  public max_viewer_count = 0;
  public like_count = 0;
  public follower_count = 0;
  public sub_count = 0;
  public share_count = 0;
  public comment_count = 0;
  public gift_count = 0;
  public coin_count = 0;
  public join_count = 0;
  public money_count = 0;

  constructor(private statusService: StatusService) {}

  ngOnInit(): void {
    this._viewerCountSub = this.statusService.viewerCount.subscribe(data => {
      console.log("Viewers : " + data.viewer_count);
      this.viewer_count = data.viewer_count;
    });
    this._maxViewerCountSub = this.statusService.maxViewerCount.subscribe(data => {
      console.log("Max de viewers : " + data.max_viewer_count);
      this.max_viewer_count = data.max_viewer_count;
    });
    this._likeCountSub = this.statusService.likeCount.subscribe(data => {
      console.log("Likes : " + data.like_count);
      this.like_count = data.like_count;
    });
    this._followerCountSub = this.statusService.followerCount.subscribe(data => {
      console.log("Followers : " + data.follower_count);
      this.follower_count = data.follower_count;
    });
    this._subCountSub = this.statusService.subCount.subscribe(data => {
      console.log("Subscribers : " + data.sub_count);
      this.sub_count = data.sub_count;
    });
    this._shareCountSub = this.statusService.shareCount.subscribe(data => {
      console.log("Shares : " + data.share_count);
      this.share_count = data.share_count;
    });
    this._commentCountSub = this.statusService.commentCount.subscribe(data => {
      console.log("Comments : " + data.comment_count);
      this.comment_count = data.comment_count;
    });
    this._giftCountSub = this.statusService.giftCount.subscribe(data => {
      console.log("Gifts : " + data.gift_count);
      this.gift_count = data.gift_count;
    });
    this._coinCountSub = this.statusService.coinCount.subscribe(data => {
      console.log("Coins : " + data.coin_count);
      this.coin_count = data.coin_count;
      this.money_count = data.coin_count * this.ratioRevenu;
    });
    this._joinCountSub = this.statusService.joinCount.subscribe(data => {
      console.log("Joins : " + data.join_count);
      this.join_count = data.join_count;
    });
  }

  ngOnDestroy() {
    this._viewerCountSub.unsubscribe();
    this._maxViewerCountSub.unsubscribe();
    this._likeCountSub.unsubscribe();
    this._followerCountSub.unsubscribe();
    this._subCountSub.unsubscribe();
    this._shareCountSub.unsubscribe();
    this._commentCountSub.unsubscribe();
    this._giftCountSub.unsubscribe();
    this._coinCountSub.unsubscribe();
    this._joinCountSub.unsubscribe();
  }

}
