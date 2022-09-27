import { Component, OnInit } from '@angular/core';
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
  
  // Particles global variables
  id = "tsparticles";

  constructor() { }

  ngOnInit(): void {
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
        value: 150
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
    console.log(container);
  }

  async particlesInit(engine: Engine): Promise<void> {
    console.log(engine);

    // Starting from 1.19.0 you can add custom presets or shape here, using the current tsParticles instance (main)
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }

}
