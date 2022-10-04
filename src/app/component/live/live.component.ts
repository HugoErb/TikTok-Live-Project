import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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
    MoveDirection,
    OutMode,
    Container,
    Engine
} from "tsparticles-engine";
import {
    loadFull
} from "tsparticles";

declare var buzz: any;

@Component({
    selector: 'app-live',
    templateUrl: './live.component.html',
    styleUrls: ['./live.component.scss']
})

export class LiveComponent implements OnInit {

    interval!: NodeJS.Timeout;

    // Sub global variables
    private _topGiftersSub!: Subscription;

    // Top gifters global variables
    public user_top_gifters_datas: TopGifter[] = [];
    public top_gifter_msg = "Faites des dons pour être dans le classement des top donateurs."

    // Particles global variables
    id = "tsparticles";

    @ViewChild("info_div") info_div!: ElementRef<HTMLDivElement>;
    @ViewChild("test") test!: ElementRef<HTMLDivElement>;

    constructor(private statusService: StatusService) { }

    ngOnInit(): void {

        // Sounds setup 
        buzz.defaults.preload = 'auto';
        buzz.defaults.volume = 5;
        let listSound = [
            "../../../assets/musics/Aaron Smith Dancin.mp3",
            "../../../assets/musics/After Dark.mp3",
            "../../../assets/musics/Discord.mp3",
            "../../../assets/musics/Sahara.mp3",
            "../../../assets/musics/House of Memories.mp3",
            "../../../assets/musics/I told you long ago on the road.mp3",
            "../../../assets/musics/Murder in my mind.mp3",
            "../../../assets/musics/My Ordinary Life.mp3",
            "../../../assets/musics/One Piece OST.mp3",
            "../../../assets/musics/Reject weakness; workout.mp3",
            "../../../assets/musics/Thank You.mp3",
            "../../../assets/musics/All the things she said.mp3",
        ];
        var music = listSound[Math.floor(Math.random() * listSound.length)];
        var mySound = new buzz.sound(music);
        mySound.play();
        console.log("Music played : " + music.replace(".mp3", "").replace("../../../assets/musics/", ""));
        this.soundSeter(mySound, listSound);

        // Mise en place du tableau des top donateurs
        this._topGiftersSub = this.statusService.topGifters.subscribe((data: TopGifter[]) => {
            this.user_top_gifters_datas = data
            this.top_gifter_msg = "Abonnez vous à " + this.user_top_gifters_datas[2].user_ID.trim()+ " !";
            // console.log(this.user_top_gifters_datas);
        });
    }

    ngAfterViewInit() {
        let counter = 0;
        this.interval = setInterval(() => {
            if (counter >= this.info_div.nativeElement.children.length) {
                counter = 0;
            }
            if (counter === 0) {
                this.info_div.nativeElement.children[this.info_div.nativeElement.children.length - 1].classList.remove('load')
            } else {
                this.info_div.nativeElement.children[counter - 1].classList.remove('load')
            }
            this.info_div.nativeElement.children[counter].classList.add('load')
            counter++;
        }, 10000);
    }

    ngOnDrestroy() {
        clearInterval(this.interval)
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
                value: 100
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

    shuffle<T>(array: T[]): T[] {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    };

    soundSeter(sound: any, listSound: any) {
        sound.bind("ended", () => {
            var music = listSound[Math.floor(Math.random() * listSound.length)];
            var newSound = new buzz.sound(music);
            newSound.play();
            console.log("Music played : " + music.replace(".mp3", "").replace("../../../assets/musics/", ""));
            this.soundSeter(newSound, listSound);
        });
    }

}
