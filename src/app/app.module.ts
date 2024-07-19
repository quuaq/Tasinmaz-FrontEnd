import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { TasinmazTableComponent } from './tasinmaz-table/tasinmaz-table.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TasinmazTableComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
