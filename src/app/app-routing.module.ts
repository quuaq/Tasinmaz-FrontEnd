import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasinmazTableComponent } from './tasinmaz-table/tasinmaz-table.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  {path: 'tasinmaz-table', component : TasinmazTableComponent},
  {path: 'map', component: MapComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }


