import {
  Component,
  OnInit,
  Inject,
  NgZone,
  PLATFORM_ID,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  Subscription
} from 'rxjs';
import {
  StatusService
} from './../../services/status.service';
import {
  TopGifter
} from './../../interface/top_gifter';
import {
  buzz
} from 'buzz';
import {
  MoveDirection,
  OutMode,
  Container,
  Engine
} from "tsparticles-engine";
import {
  loadFull
} from "tsparticles";

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})


export class LiveComponent implements OnInit {

  // Sub global variables
  private _topGiftersSub!: Subscription;

  // Dashboard tables global variables
  public user_top_gifters_datas: TopGifter[] = []

  // Particles global variables
  id = "tsparticles";


  constructor(private statusService: StatusService) { }

  ngOnInit(): void {

    // Sounds global variables
    buzz.defaults.preload = 'auto';
    var soundCollection = new buzz.sound([
      "../../../assets/musics/Aaron Smith Dancin.mp3",
      "../../../assets/musics/After Dark.mp3",
      "../../../assets/musics/Discord.mp3",
      "../../../assets/musics/Gimme.mp3",
      "../../../assets/musics/HENSONN - SAHARA.mp3",
      "../../../assets/musics/House of Memories.mp3",
      "../../../assets/musics/Industry Baby vs. E.T.mp3",
      "../../../assets/musics/MURDER IN MY MIND.mp3",
      "../../../assets/musics/My Ordinary Life.mp3",
      "../../../assets/musics/One Piece OST.mp3",
      "../../../assets/musics/Reject weakness; workout.mp3",
      "../../../assets/musics/Thank You.mp3",
      "../../../assets/musics/all the things she said.mp3",
    ]);
    soundCollection.loop().play().loop()

    // Mise en place du tableau des top donnateurs
    this._topGiftersSub = this.statusService.topGifters.subscribe((data: TopGifter[]) => {
      this.user_top_gifters_datas = data
      console.log(this.user_top_gifters_datas);
    });
  }

  /****************************************** Particles config *******************************************/
  particlesOptions = {
    background: {
      color: {
        value: "#232323"
      }
    },
    fpsLimit: 165,
    interactivity: {
      events: {
        resize: true
      },
    },
    particles: {
      color: {
        value: "#ffffff"
      },
      links: {
        color: "#ffffff",
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
        value: 120
      },
      opacity: {
        value: 0.5
      },
      shape: {
        type: "circle"
      },
      size: {
        value: { min: 1, max: 3 },
      }
    },
    detectRetina: true
  };

  particlesLoaded(container: Container): void {
  }

  async particlesInit(engine: Engine): Promise<void> {
    await loadFull(engine);
  }

}
