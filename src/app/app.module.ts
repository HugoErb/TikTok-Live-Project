import {
  HttpClientModule
} from '@angular/common/http';
import {
  NgModule
} from '@angular/core';
import {
  BrowserModule
} from '@angular/platform-browser';
import {
  SocketIoModule,
  SocketIoConfig
} from 'ngx-socket-io';
import {
  NgParticlesModule
} from "ng-particles";
import {
  AppRoutingModule
} from './app-routing.module';
import {
  AppComponent
} from './app.component';

const config: SocketIoConfig = {
  url: 'http://localhost:8080',
  options: {}
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    NgParticlesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
