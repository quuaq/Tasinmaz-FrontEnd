// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';
// import { TasinmazTableComponent } from './tasinmaz-table/tasinmaz-table.component';
// import { MapComponent } from './map/map.component';
// import { LogIslemleriComponent } from './log-islemleri/log-islemleri.component';


// const routes: Routes = [
//   { path: '', redirectTo: '/tasinmaz-table', pathMatch: 'full' },
//   { path: 'tasinmaz-table', component: TasinmazTableComponent },
//   { path: 'map', component: MapComponent },
//   { path: 'log-islemleri', component: LogIslemleriComponent }

// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes )],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }

// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';
// import { TasinmazTableComponent } from './tasinmaz-table/tasinmaz-table.component';
// import { MapComponent } from './map/map.component';
// import { LogIslemleriComponent } from './log-islemleri/log-islemleri.component';
// import { LoginComponent } from './login/login.component';



// const routes: Routes = [
//   { path: '', redirectTo: '/login', pathMatch: 'full' },
//   { path: 'tasinmaz-table', component: TasinmazTableComponent }, // Korumalı rota
//   { path: 'map', component: MapComponent},
//   { path: 'log-islemleri', component: LogIslemleriComponent }, // Bu sayfa için guard ekleyin
//   { path: 'login', component:LoginComponent}
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }


//--------------------------------------------------
// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';
// import { TasinmazTableComponent } from './tasinmaz-table/tasinmaz-table.component';
// import { MapComponent } from './map/map.component';
// import { LogIslemleriComponent } from './log-islemleri/log-islemleri.component';
// import { LoginComponent } from './login/login.component';
// import { AuthGuard } from './guards/auth.guard';
// import { AdminGuard } from './guards/admin.guard';

// const routes: Routes = [
//   { path: '', redirectTo: '/login', pathMatch: 'full' },
//   { path: 'tasinmaz-table', component: TasinmazTableComponent, canActivate: [AuthGuard] }, // Korumalı rota
//   { path: 'map', component: MapComponent, canActivate: [AuthGuard] },
//   { path: 'log-islemleri', component: LogIslemleriComponent, canActivate: [AuthGuard, AdminGuard] }, // Bu sayfa için guard ekleyin
//   { path: 'login', component: LoginComponent }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }

//**********************************************/

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasinmazTableComponent } from './tasinmaz-table/tasinmaz-table.component';
import { MapComponent } from './map/map.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { KullaniciListesiComponent } from './kullanici-listesi/kullanici-listesi.component';
import { LogIslemleriComponent } from './log-islemleri/log-islemleri.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'tasinmaz-table', component: TasinmazTableComponent, canActivate: [AuthGuard] }, // Korumalı rota
  { path: 'login', component: LoginComponent },
  //{ path: '**', redirectTo: '/login' } // Diğer tüm rotalar için yeniden yönlendirme
  { path: 'kullanici-listesi', component: KullaniciListesiComponent, canActivate: [AuthGuard, AdminGuard]},
  { path: 'log-islemleri', component: LogIslemleriComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
