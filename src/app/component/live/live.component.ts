import { Component, OnInit} from '@angular/core';
import {
    StatusService
} from './../../services/status.service';

declare var buzz: any;

@Component({
    selector: 'app-live',
    templateUrl: './live.component.html',
    styleUrls: ['./live.component.scss']
})

export class LiveComponent implements OnInit {

    countRose: number = 0;
    countWeights: number = 0;
    interval!: NodeJS.Timer;

    // Sub global variables
    private _boysGirlsCounter!:any;

    constructor(private statusService: StatusService) { }

    ngOnInit(): void {

        this._boysGirlsCounter = this.statusService.boysGirlsCounter.subscribe(gift => {
            console.log("Ajout de " + gift.number + " " + gift.type);
            if (gift.type === "Rose") {
                this.countRose = this.countRose + gift.number;
            } else if (gift.type === "Weights") {
                this.countWeights = this.countWeights + gift.number;
            }
        });

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
            "../../../assets/musics/Neon Blade.mp3",
        ];
        var music = listSound[Math.floor(Math.random() * listSound.length)];
        var mySound = new buzz.sound(music);
        mySound.play();
        console.log("Music played : " + music.replace(".mp3", "").replace("../../../assets/musics/", ""));
        this.setSounds(mySound, listSound);

    }

    // ngAfterViewInit() {
    //     let counter = 0;
    //     this.interval = setInterval(() => {
    //         if (counter >= this.info_div.nativeElement.children.length) {
    //             counter = 0;
    //         }
    //         if (counter === 0) {
    //             this.info_div.nativeElement.children[this.info_div.nativeElement.children.length - 1].classList.remove('load')
    //         } else {
    //             this.info_div.nativeElement.children[counter - 1].classList.remove('load')
    //         }
    //         this.info_div.nativeElement.children[counter].classList.add('load')
    //         counter++;
    //     }, 10000);
    // }

    ngOnDestroy() {
        clearInterval(this.interval)
    }

    setSounds(sound: any, listSound: any) {
        sound.bind("ended", () => {
            var music = listSound[Math.floor(Math.random() * listSound.length)];
            var newSound = new buzz.sound(music);
            newSound.play();
            console.log("Music played : " + music.replace(".mp3", "").replace("../../../assets/musics/", ""));
            this.setSounds(newSound, listSound);
        });
    }

}
