import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { getValue, NgxsModule, setValue } from '@ngxs/store';
import { asNumber, asString } from 'src/libs/ngxs-param-plugin/operators';
import { RouteParamEngine } from 'src/libs/ngxs-param-plugin/param-plugin.engine';
import { RouteParamsPluginModule } from 'src/libs/ngxs-param-plugin/param-plugin.module';
import { ROUTE_PARAMS_ENGINE } from 'src/libs/ngxs-param-plugin/param-plugin.types';

import { AppComponent } from './app.component';
import { AppState } from './app.state';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxsModule.forRoot([AppState]),
    RouteParamsPluginModule.forRoot([{
        state: AppState,
        prop: 'count', // path to through the state
        query: 'counter',
        transform: asNumber(), // default to JSON serializer
        routeMathing: (url: string) => /newUser=true/.test(url)
      },
      {
        state: AppState,
        prop: 'name',
        query: 'the-boss',
        transform: asString(),
        routeMathing: (url: string) => true
      }]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
