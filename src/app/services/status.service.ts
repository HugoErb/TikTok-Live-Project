import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  Socket
} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private statusUrl = '/api/status';
  currentDocument = this.socket.fromEvent < any > ('document');

  viewerCount = this.socket.fromEvent < any > ('viewer_count');
  maxViewerCount = this.socket.fromEvent < any > ('max_viewer_count');
  likeCount = this.socket.fromEvent < any > ('like_count');
  followerCount = this.socket.fromEvent < any > ('follower_count');
  subCount = this.socket.fromEvent < any > ('sub_count');
  shareCount = this.socket.fromEvent < any > ('share_count');
  commentCount = this.socket.fromEvent < any > ('comment_count');
  giftCount = this.socket.fromEvent < any > ('gift_count');
  coinCount = this.socket.fromEvent < any > ('coin_count');
  joinCount = this.socket.fromEvent < any > ('join_count');
  connectedState = this.socket.fromEvent < any > ('connected_state');
  liveStartHour = this.socket.fromEvent < any > ('live_start_hour');
  comment = this.socket.fromEvent < any > ('comment');
  liveName = this.socket.fromEvent < any > ('live_name');
  gift = this.socket.fromEvent < any > ('gift');
  topDonators = this.socket.fromEvent < any > ('top_donators');

  boysGirlsCounter = this.socket.fromEvent < any > ('boys_girls_counter');

  constructor(private http: HttpClient, private socket: Socket) {}

  // Error handling
  private error(error: any) {
    let message = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(message);
  }
}
