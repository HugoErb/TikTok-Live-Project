import {
  Component,
  OnInit,
  Inject,
  NgZone,
  PLATFORM_ID
} from '@angular/core';
import {
  Subscription
} from 'rxjs';
import {
  StatusService
} from './../../services/status.service';
import {
  Comment
} from './../../interface/comment';
import {
  Gift
} from './../../interface/gift';
import {
  isPlatformBrowser
} from '@angular/common';
import {
  MoveDirection,
  ClickMode,
  HoverMode,
  OutMode,
  Container,
  Engine
} from "tsparticles-engine";
import {
  loadFull
} from "tsparticles";

// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

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
  private _connectedStateSub!: Subscription;
  private _commentSub!: Subscription;
  private _giftSub!: Subscription;

  private ratioRevenu = 0.01285714286;
  public connected_icon = "checkmark-circle-outline";
  public green_color = "green";
  public disconnected_icon = "close-circle-outline";
  public red_color = "color:\"red\"";
  public connected_icon_color = this.red_color;
  public connected_text_state = "Déconnecté";
  public connected_icon_state = this.disconnected_icon;

  public connected_state: boolean = false;

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
  public start_hour = "--h--";
  public chart_datas!: any[];
  public user_comment_datas: Comment[] = []
  public user_gift_datas: Gift[] = []

  private root!: am5.Root;
  series: any;

  id = "tsparticles";

  constructor(private statusService: StatusService, @Inject(PLATFORM_ID) private platformId: Object, private zone: NgZone) {}

  ngOnInit(): void {

    // Mise en place du compteur de vues + màj du graphique du nombre de viewers
    this._connectedStateSub = this.statusService.connectedState.subscribe(data => {
      this.define_connected_state(true);
    });

    // Mise en place de la date de début de liv
    let date: Date = new Date();
      let hour_connector = "h";
      if (date.getMinutes() < 10) {
        hour_connector = "h0";
      }
      this.start_hour = date.getHours() + hour_connector + date.getMinutes();

    // Mise en place du compteur de vues + màj du graphique du nombre de viewers
    this._viewerCountSub = this.statusService.viewerCount.subscribe(data => {
      console.log("Viewers : " + data.viewer_count);
      this.viewer_count = data.viewer_count;
      let date = new Date();
      let new_data = {
        date: date.getTime(),
        value: this.viewer_count
      }
      this.series.data.push(new_data);
      this.define_connected_state(true);
    });

    // Mise en place du compteur de vues maximum
    this._maxViewerCountSub = this.statusService.maxViewerCount.subscribe(data => {
      console.log("Max de viewers : " + data.max_viewer_count);
      this.max_viewer_count = data.max_viewer_count;
      this.define_connected_state(true);
    });

    // Mise en place du compteur de likes 
    this._likeCountSub = this.statusService.likeCount.subscribe(data => {
      console.log("Likes : " + data.like_count);
      this.like_count = data.like_count;
      this.define_connected_state(true);
    });

    // Mise en place du compteur de followers
    this._followerCountSub = this.statusService.followerCount.subscribe(data => {
      console.log("Followers : " + data.follower_count);
      this.follower_count = data.follower_count;
      this.define_connected_state(true);
    });

    // Mise en place du compteur de subs
    this._subCountSub = this.statusService.subCount.subscribe(data => {
      console.log("Subscribers : " + data.sub_count);
      this.sub_count = data.sub_count;
      this.define_connected_state(true);
    });

    // Mise en place du compteur de shares
    this._shareCountSub = this.statusService.shareCount.subscribe(data => {
      console.log("Shares : " + data.share_count);
      this.share_count = data.share_count;
      this.define_connected_state(true);
    });

    // Mise en place du compteur de commentaires
    this._commentCountSub = this.statusService.commentCount.subscribe(data => {
      console.log("Comments : " + data.comment_count);
      this.comment_count = data.comment_count;
      this.define_connected_state(true);
    });

    // Mise en place du compteur de gift
    this._giftCountSub = this.statusService.giftCount.subscribe(data => {
      console.log("Gifts : " + data.gift_count);
      this.gift_count = data.gift_count;
      this.define_connected_state(true);
    });

    // Mise en place du compteur de coins
    this._coinCountSub = this.statusService.coinCount.subscribe(data => {
      console.log("Coins : " + data.coin_count);
      this.coin_count = data.coin_count;
      this.money_count = data.coin_count * this.ratioRevenu;
      this.define_connected_state(true);
    });

    // Mise en place du compteur de joins
    this._joinCountSub = this.statusService.joinCount.subscribe(data => {
      console.log("Joins : " + data.join_count);
      this.join_count = data.join_count;
      this.define_connected_state(true);
    });

    // Mise en place du chat
    this._commentSub = this.statusService.comment.subscribe((data: Comment) => {
      if (this.user_comment_datas.length < 9) {
        this.user_comment_datas.push(data);
      } else {
        this.user_comment_datas.shift();
        this.user_comment_datas.push(data);
      }
      this.define_connected_state(true);
    });

    // Mise en place du tableau des gifts
    this._giftSub = this.statusService.gift.subscribe((data: Gift) => {
      if (this.user_gift_datas.length < 9) {
        this.user_gift_datas.push(data);
      } else {
        this.user_gift_datas.shift();
        this.user_gift_datas.push(data);
      }
    });
  }

  // Config du graphique du nombre de viewers
  ngAfterViewInit() {
    this.browserOnly(() => {
      let root = am5.Root.new("chartdiv");

      root.setThemes([am5themes_Animated.new(root)]);

      // Create chart
      let chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true
      }));

      chart.get("colors") !.set("colors", [
        am5.color(0x3399ff),
      ]);

      // Add cursor
      let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
        behavior: "none"
      }));
      cursor.lineY.set("visible", false);

      // Create axes
      let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
        maxDeviation: 0.2,
        baseInterval: {
          timeUnit: "second",
          count: 1
        },
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {})
      }));

      let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      }));

      // Add series
      this.series = chart.series.push(am5xy.LineSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}"
        })
      }));

      this.series.strokes.template.setAll({
        strokeWidth: 3
      });

      // Make stuff animate on load
      this.series.appear(1000);
      chart.appear(1000, 100);

    })
  };

  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }
  /****************************************** Connected Icons *******************************************/
  define_connected_state(connected_state: boolean) {
    // if (connected_state == true) {
    //   this.connected_text_state = "Connecté";
    //   this.connected_icon_state = this.connected_icon;
    //   this.connected_icon_color = this.green_color;
    // } else {
    //   this.connected_text_state = "Déconnecté";
    //   this.connected_icon_state = this.disconnected_icon;
    //   this.connected_icon_color = this.red_color;
    // }
    this.connected_state = connected_state;
    if (connected_state === true) {
      this.connected_text_state = "Connecté"
    } else {
      this.connected_text_state = "Déconnecté"
    }
  }

  /****************************************** Particles *******************************************/
  particlesOptions = {
    background: {
      color: {
        value: "#fff"
      }
    },
    fpsLimit: 165,
    interactivity: {
      events: {
        onClick: {
          enable: false,
          mode: ClickMode.push
        },
        onHover: {
          enable: false,
          mode: HoverMode.repulse
        },
        resize: true
      },
      modes: {
        push: {
          quantity: 4
        },
        repulse: {
          distance: 200,
          duration: 0.4
        }
      }
    },
    particles: {
      color: {
        value: "#287bff"
      },
      links: {
        color: "#287bff",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1
      },
      collisions: {
        enable: false
      },
      move: {
        direction: MoveDirection.none,
        enable: true,
        outModes: {
          default: OutMode.bounce
        },
        random: false,
        speed: 0.3,
        straight: false
      },
      number: {
        density: {
          enable: true,
          area: 800
        },
        value: 50
      },
      opacity: {
        value: 0.5
      },
      shape: {
        type: "circle"
      },
      size: {
        value: {
          min: 1,
          max: 3
        },
      }
    },
    detectRetina: true
  };

  particlesLoaded(container: Container): void {
    console.log(container);
  }

  async particlesInit(engine: Engine): Promise < void > {
    console.log(engine);

    // Starting from 1.19.0 you can add custom presets or shape here, using the current tsParticles instance (main)
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
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
