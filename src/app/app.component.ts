import {
    Component,
} from '@angular/core';
import {
    StatusService
} from './shared/status.service';
import {
    Subscription
} from 'rxjs';
import { MoveDirection, ClickMode, HoverMode, OutMode, Container, Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    id = "tsparticles";
    title = 'socket-test';
    private _docSub!: Subscription;

    countRose: number = 0;
    countWeights: number = 0;
    interval!: NodeJS.Timer;

    constructor(private statusService: StatusService) { }

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

    /* or the classic JavaScript object */
    particlesOptions = {
        background: {
            color: {
                value: "#0d47a1"
            }
        },
        fpsLimit: 120,
        interactivity: {
            events: {
                onClick: {
                    enable: true,
                    mode: ClickMode.push
                },
                onHover: {
                    enable: true,
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
                enable: true
            },
            move: {
                direction: MoveDirection.none,
                enable: true,
                outModes: {
                    default: OutMode.bounce
                },
                random: false,
                speed: 6,
                straight: false
            },
            number: {
                density: {
                    enable: true,
                    area: 800
                },
                value: 80
            },
            opacity: {
                value: 0.5
            },
            shape: {
                type: "circle"
            },
            size: {
                value: { min: 1, max: 5 },
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
