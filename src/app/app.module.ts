// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatSelectModule } from '@angular/material/select'; // MatSelectModule import edin
// import { FormsModule } from '@angular/forms';
// import { ReactiveFormsModule } from '@angular/forms';
// import { AppRoutingModule } from './app-routing.module'; // AppRoutingModule import edin
// import { AppComponent } from './app.component';
// import { NavComponent } from './nav/nav.component';
// import { TasinmazTableComponent } from './tasinmaz-table/tasinmaz-table.component';
// import { MapComponent } from './map/map.component';
// import { TasinmazaddComponent } from './tasinmazadd/tasinmazadd.component';
// import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';




// @NgModule({
//   declarations: [
//     AppComponent,
//     NavComponent,
//     TasinmazTableComponent,
//     MapComponent,
//     TasinmazaddComponent,
//     ConfirmDeleteComponent,
//   ],
//   imports: [
//     BrowserModule,
//     HttpClientModule,
//     BrowserAnimationsModule,
//     MatDialogModule,
//     MatFormFieldModule, // MatFormFieldModule ekleyin
//     MatInputModule, // MatInputModule ekleyin
//     MatButtonModule,
//     MatSelectModule, // MatSelectModule ekleyin
//     FormsModule,
//     ReactiveFormsModule,
//     AppRoutingModule, // AppRoutingModule ekleyin
//   ],
//   entryComponents: [
//     TasinmazaddComponent
//   ],
//   providers: [],
//   bootstrap: [AppComponent],
// })
// export class AppModule { }


// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatSelectModule } from '@angular/material/select';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { NavComponent } from './nav/nav.component';
// import { TasinmazTableComponent } from './tasinmaz-table/tasinmaz-table.component';
// import { MapComponent } from './map/map.component';
// import { TasinmazaddComponent } from './tasinmazadd/tasinmazadd.component';
// import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
// import { LogIslemleriComponent } from './log-islemleri/log-islemleri.component';
// import { LoginComponent } from './login/login.component';

// @NgModule({
//   declarations: [
//     AppComponent,
//     NavComponent,
//     TasinmazTableComponent,
//     MapComponent,
//     TasinmazaddComponent,
//     ConfirmDeleteComponent,
//     LogIslemleriComponent,
//     LoginComponent,
//   ],
//   imports: [
//     BrowserModule,
//     HttpClientModule,
//     BrowserAnimationsModule,
//     MatDialogModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatButtonModule,
//     MatSelectModule,
//     FormsModule,
//     ReactiveFormsModule,
//     AppRoutingModule
//   ],
//   entryComponents: [
//     TasinmazaddComponent,
//     ConfirmDeleteComponent // ConfirmDeleteComponent'i ekleyin
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }

// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatSelectModule } from '@angular/material/select';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { NavComponent } from './nav/nav.component';
// import { TasinmazTableComponent } from './tasinmaz-table/tasinmaz-table.component';
// import { MapComponent } from './map/map.component';
// import { TasinmazaddComponent } from './tasinmazadd/tasinmazadd.component';
// import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
// import { LogIslemleriComponent } from './log-islemleri/log-islemleri.component';
// import { AlertifyService } from './services/alertify.service';
// import { LoginComponent } from './login/login.component';



// @NgModule({
//   declarations: [
//     AppComponent,
//     NavComponent,
//     TasinmazTableComponent,
//     MapComponent,
//     TasinmazaddComponent,
//     ConfirmDeleteComponent,
//     LogIslemleriComponent,
//     LoginComponent,
//   ],
//   imports: [
//     BrowserModule,
//     HttpClientModule,
//     BrowserAnimationsModule,
//     MatDialogModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatButtonModule,
//     MatSelectModule,
//     FormsModule,
//     ReactiveFormsModule,
//     AppRoutingModule
//   ],
//   entryComponents: [
//     TasinmazaddComponent,
//     ConfirmDeleteComponent,
//   ],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }



//-----------------------------------------
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { TasinmazTableComponent } from './tasinmaz-table/tasinmaz-table.component';
import { MapComponent } from './map/map.component';
import { TasinmazaddComponent } from './tasinmazadd/tasinmazadd.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { LoginComponent } from './login/login.component';
import { AlertifyService } from './services/alertify.service';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './auth.interceptor';
import { KullaniciListesiComponent } from './kullanici-listesi/kullanici-listesi.component';
import { KullaniciAddComponent } from './kullanici-add/kullanici-add.component';
import { LogIslemleriComponent } from './log-islemleri/log-islemleri.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TasinmazTableComponent,
    MapComponent,
    TasinmazaddComponent,
    ConfirmDeleteComponent,
    LoginComponent,
    KullaniciListesiComponent,
    KullaniciAddComponent,
    LogIslemleriComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  entryComponents: [
    TasinmazaddComponent,
    ConfirmDeleteComponent,
    KullaniciAddComponent // Bu satırı ekleyin
  ],
  providers: [
    AlertifyService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
