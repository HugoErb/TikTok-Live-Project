import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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

    listSound = [
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
        "../../../assets/musics/You are my enemy.mp3"];

    boysGifUrls = [
        'https://media.tenor.com/_LXobN73z80AAAAd/one-punch-man-garou-vs-saitama.gif',
        'https://media.tenor.com/8I-zJn-yrocAAAAC/benimaru.gif',
        'https://media.tenor.com/F2q8AHyHa4oAAAAC/goku-songoku.gif',
        'https://media.tenor.com/rH0jFMF5z3AAAAAC/kirito-sao.gif',
        'https://media.tenor.com/dRIFx4u1GmcAAAAd/luffy-monkey-d-luffy.gif',
        'https://media.tenor.com/3OFnL8VfOmwAAAAd/david-edgerunners.gif',
        'https://media.tenor.com/Js4cPKKQUtsAAAAC/demon-slayer-kimetsu-no-yaiba.gif',
        'https://media.tenor.com/4LsqigkIqoIAAAAC/anime-boys.gif',
        'https://media.tenor.com/xVY4rq-4RBsAAAAC/black-clover-rakugaki-page.gif',
        'https://media.tenor.com/LJdpj6S0QK4AAAAC/anim%C3%A9.gif',
        'https://media.tenor.com/nEe0t726IZoAAAAd/naruto.gif',
        'https://media.tenor.com/HYZD06iWjlwAAAAC/sasuke-naruto.gif',
        'https://media.tenor.com/QNuPMp9L0REAAAAC/sharingan-itachi-uchiha.gif',
        'https://media.tenor.com/3Mv0Img3Ca4AAAAC/shoto-todoroki-my-hero-academia.gif',
        'https://media.tenor.com/r8lCitXM_9UAAAAd/gon.gif',
        'https://media.tenor.com/6oOwU5DNKnMAAAAC/zragon-infinity-zoro.gif',
        'https://media.tenor.com/mgWk9PRE1HgAAAAd/zoro-wano.gif',
        'https://media.tenor.com/pLhhw8tQib0AAAAC/killua-hunter-x-hunter.gif',
        'https://media.tenor.com/Df9P1tV4khIAAAAd/anime-ayanokoji.gif',
        'https://media.tenor.com/sMGZ93n6Nc4AAAAC/death-note-anime.gif',
        'https://media.tenor.com/MNtqvOEE5Z0AAAAC/zenitsu-zenitsu-agatsuma.gif',
        'https://media.tenor.com/8vxzZEUgDLYAAAAC/goblin-slayer.gif'];

    girlsGifUrls = [
        'https://media.tenor.com/w_vsQrD460kAAAAC/rias.gif',
        'https://media.tenor.com/HK6779s4Z_cAAAAC/nami-nami-wano.gif',
        'https://media.tenor.com/w7ybY6JjkDEAAAAC/pfp-boa.gif',
        'https://media.tenor.com/mrzI0AC4Rz4AAAAC/rias-gremory-rias.gif',
        'https://media.tenor.com/AXC-aHSGZZgAAAAC/anime-girl-cool-anime-girl.gif',
        'https://media.tenor.com/EX3e82-9sHkAAAAd/cyberpunk-cyberpunk-anime.gif',
        'https://media.tenor.com/R03tgxlwbysAAAAd/daki-daki-demon-slayer.gif',
        'https://media.tenor.com/JSgFUQVFa6AAAAAC/jolyne-kujo-jolyne-cujoh.gif',
        'https://media.tenor.com/jh4EA2d5pIcAAAAC/kitagawa-marin-kitagawa.gif',
        'https://media.tenor.com/K2fXA6tA4GYAAAAd/anime-girl.gif',
        'https://media.tenor.com/m292GSi3JNYAAAAd/aqua-konosuba.gif',
        'https://media.tenor.com/Uz5iy1iEKAoAAAAd/shikimoris-not-just-cute-shikimori.gif',
        'https://media.tenor.com/ZKyywOPBcpwAAAAC/akame-akame-ga-k-ill.gif',
        'https://media.tenor.com/NBnnmy6an8IAAAAC/erza-scarlet-erza.gif',
        'https://media.tenor.com/0IJVLVdc-QAAAAAC/erza-erza-scarlet.gif',
        'https://media.tenor.com/Ww9ony-HQAwAAAAC/esdeath-agk.gif',
        'https://media.tenor.com/6Sz_9iSt7kAAAAAd/idoly-pride-anime-girl-dancing.gif',
        'https://media.tenor.com/wFDPSTUwuYgAAAAC/fire-force-tamaki-kotatsu.gif',
        'https://media.tenor.com/ZKQj33zGSYcAAAAC/fire-force-maki-oze.gif',
        'https://media.tenor.com/D1IIF2tgyxoAAAAC/princess-hibana.gif',
        'https://media.tenor.com/cxEkoaz4y0UAAAAC/uraraka-ochako.gif',
        'https://media.tenor.com/GVI_OXQMT14AAAAC/nemuri-midnight.gif'
    ];

    // Sub global variables
    private _boysGirlsCounter!: any;

    constructor(private statusService: StatusService) { }

    @ViewChild("gif") gif!: ElementRef<HTMLDivElement>;
    @ViewChild("gif2") gif2!: ElementRef<HTMLDivElement>;

    ngOnInit(): void {

        // Counter setup
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
        var music = this.listSound[Math.floor(Math.random() * this.listSound.length)];
        var mySound = new buzz.sound(music);
        mySound.play();
        console.log("Music played : " + music.replace(".mp3", "").replace("../../../assets/musics/", ""));
        this.setSounds(mySound);
    }

    ngOnDestroy() {
        clearInterval(this.interval)
    }

    setSounds(sound: any) {
        sound.bind("ended", () => {
            var music = this.listSound[Math.floor(Math.random() * this.listSound.length)];
            var newSound = new buzz.sound(music);
            newSound.play();
            console.log("Music played : " + music.replace(".mp3", "").replace("../../../assets/musics/", ""));
            this.setSounds(newSound);
            this.changeGif();
        });
    }

    changeGif() {
        var randomBoyGif = this.boysGifUrls[Math.floor(Math.random() * this.boysGifUrls.length)];
        var randomGirlGif = this.girlsGifUrls[Math.floor(Math.random() * this.girlsGifUrls.length)];
        this.gif.nativeElement.style.backgroundImage = "url(" + randomGirlGif + ");";
        this.gif2.nativeElement.style.backgroundImage =  "url(" + randomBoyGif + ");";
    }

}
