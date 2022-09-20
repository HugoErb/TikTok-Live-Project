import {
  HttpClientModule
} from '@angular/common/http';
import {
  NgModule, CUSTOM_ELEMENTS_SCHEMA
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
import { DashboardComponent } from './component/dashboard/dashboard.component';

const config: SocketIoConfig = {
  url: 'http://localhost:8080',
  options: {}
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    NgParticlesModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
