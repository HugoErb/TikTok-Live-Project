import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
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

    boysVideoUrls = [
        'https://media.tenor.com/_LXobN73z80AAAPo/one-punch-man-garou-vs-saitama.mp4',
        'https://media.tenor.com/M5qnkJbd_T8AAAPo/fire-force-benimaru-shinmon.mp4',
        'https://media.tenor.com/F2q8AHyHa4oAAAPo/goku-songoku.mp4',
        'https://media.tenor.com/zbZ3fR5i5hcAAAPo/sao-kirito.mp4',
        'https://media.tenor.com/G9XzSVsTbncAAAPo/cyberpunk-cyberpunk-anime.mp4',
        'https://media.tenor.com/D3gygEesiVEAAAPo/jujutsu-kaisen.mp4',
        'https://media.tenor.com/Js4cPKKQUtsAAAPo/demon-slayer-kimetsu-no-yaiba.mp4',
        'https://media.tenor.com/xVY4rq-4RBsAAAPo/black-clover-rakugaki-page.mp4',
        'https://media.tenor.com/LJdpj6S0QK4AAAPo/anim%C3%A9.mp4',
        'https://media.tenor.com/ffe3-fyhK0wAAAPo/classroom-of-the-elite.mp4',
        'https://media.tenor.com/nEe0t726IZoAAAPo/naruto.mp4',
        'https://media.tenor.com/HYZD06iWjlwAAAPo/sasuke-naruto.mp4',
        'https://media.tenor.com/QNuPMp9L0REAAAPo/sharingan-itachi-uchiha.mp4',
        'https://media.tenor.com/3Mv0Img3Ca4AAAPo/shoto-todoroki-my-hero-academia.mp4',
        'https://media.tenor.com/r8lCitXM_9UAAAPo/gon.mp4',
        'https://media.tenor.com/6oOwU5DNKnMAAAPo/zragon-infinity-zoro.mp4',
        'https://media.tenor.com/mgWk9PRE1HgAAAPo/zoro-wano.mp4',
        'https://media.tenor.com/pLhhw8tQib0AAAPo/killua-hunter-x-hunter.mp4',
        'https://media.tenor.com/sMGZ93n6Nc4AAAPo/death-note-anime.mp4',
        'https://media.tenor.com/MNtqvOEE5Z0AAAPo/zenitsu-zenitsu-agatsuma.mp4',
        'https://media.tenor.com/Ss2Oy9D2ra8AAAPo/goblin-slayer-rage.mp4',
        'https://media.tenor.com/nJW6x9jzp1AAAAPo/mob-psycho100-mob-psycho.mp4',
        'https://media.tenor.com/x3tOr0N__jUAAAPo/levi-ackerman.mp4',
        'https://media.tenor.com/IqSp4ITuCdcAAAPo/satorou-gojo-satoru-gojo.mp4'];

    girlsVideoUrls = [
        'https://media.tenor.com/w_vsQrD460kAAAPo/rias.mp4',
        'https://media.tenor.com/HK6779s4Z_cAAAPo/nami-nami-wano.mp4',
        'https://media.tenor.com/AXC-aHSGZZgAAAPo/anime-girl-cool-anime-girl.mp4',
        'https://media.tenor.com/EX3e82-9sHkAAAPo/cyberpunk-cyberpunk-anime.mp4',
        'https://media.tenor.com/R03tgxlwbysAAAPo/daki-daki-demon-slayer.mp4',
        'https://media.tenor.com/JSgFUQVFa6AAAAPo/jolyne-kujo-jolyne-cujoh.mp4',
        'https://media.tenor.com/K2fXA6tA4GYAAAPo/anime-girl.mp4',
        'https://media.tenor.com/ZKyywOPBcpwAAAPo/akame-akame-ga-k-ill.mp4',
        'https://media.tenor.com/NBnnmy6an8IAAAPo/erza-scarlet-erza.mp4',
        'https://media.tenor.com/0IJVLVdc-QAAAAPo/erza-erza-scarlet.mp4',
        'https://media.tenor.com/Ww9ony-HQAwAAAPo/esdeath-agk.mp4',
        'https://media.tenor.com/wFDPSTUwuYgAAAPo/fire-force-tamaki-kotatsu.mp4',
        'https://media.tenor.com/ZKQj33zGSYcAAAPo/fire-force-maki-oze.mp4',
        'https://media.tenor.com/D1IIF2tgyxoAAAPo/princess-hibana.mp4',
        'https://media.tenor.com/3Kgx92jYQgoAAAPo/zero-two-zero.mp4',
        'https://media.tenor.com/GVI_OXQMT14AAAPo/nemuri-midnight.mp4',
        'https://media.tenor.com/vD0cfocNwtcAAAPo/yamato-one-piece.mp4',
        'https://media.tenor.com/Xibx6rxiLSkAAAPo/cyberpunk-cyberpunk-anime.mp4',
        'https://media.tenor.com/giyqfACP9hMAAAPo/highschooldxd-rias.mp4',
        'https://media.tenor.com/ACCxl7AXouYAAAPo/akame.mp4',
        'https://media.tenor.com/DY9SDSFFrG4AAAPo/boa-hancock.mp4',
        'https://media.tenor.com/wsE6XKFDTh0AAAPo/daki-kimetsu-no-yaiba.mp4',
        'https://media.tenor.com/Jo82odq693IAAAPo/zero-two-pose.mp4',
        'https://media.tenor.com/e8RbfKtfPTcAAAPo/sono-bisque-doll-wa-koi-wo-suru-my-dress-up-darling.mp4',
        'https://media.tenor.com/KpNg7EV75q0AAAPo/mai-sakurajima.mp4'];

    video_src_url!: string;
    video2_src_url!: string;

    // Sub global variables
    private _boysGirlsCounter!: any;

    constructor(private statusService: StatusService, private elRef: ElementRef) { }

    @ViewChild("video") video!: ElementRef<HTMLVideoElement>;
    @ViewChild("video2") video2!: ElementRef<HTMLVideoElement>;

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
        this.changeVideo();
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
            this.changeVideo();
        });
    }

    changeVideo() {
        var randomBoyVideo = this.boysVideoUrls[Math.floor(Math.random() * this.boysVideoUrls.length)];
        var randomGirlVideo = this.girlsVideoUrls[Math.floor(Math.random() * this.girlsVideoUrls.length)];
        this.video_src_url = randomGirlVideo;
        this.video2_src_url = randomBoyVideo;
        const player = this.elRef.nativeElement.querySelectorAll('video');
        player.forEach((item: any) => {
            item.load();
        })
    }

    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
        if (event.key === "Enter") {
            this.changeVideo();
        }
    }

}
