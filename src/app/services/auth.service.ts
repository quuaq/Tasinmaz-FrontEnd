// import { Injectable } from '@angular/core';
// import { LoginUser } from '../models/loginUser';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { JwtHelperService } from '@auth0/angular-jwt';
// import { Router } from '@angular/router';
// import { AlertifyService } from './alertify.service';
// import { RegisterUser } from '../models/registerUser';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor(
//     private httpClient: HttpClient,
//     private router: Router,
//     private alertifyService: AlertifyService
//   ) { }

//   path = "http://localhost:44379/api/Auth/";
//   userToken: any;
//   decodedToken: any;
//   jwtHelper: JwtHelperService = new JwtHelperService();
//   TOKEN_KEY = "token";

//   login(loginUser: LoginUser) {
//     let headers = new HttpHeaders().set("Content-Type", "application/json");
//     this.httpClient.post(this.path + "login", loginUser, { headers: headers })
//       .subscribe((data: any) => {
//         this.saveToken(data.tokenString);
//         this.userToken = data.tokenString;
//         this.decodedToken = this.jwtHelper.decodeToken(data.tokenString);
//         this.alertifyService.success("Sisteme Giriş Yapıldı");
//         this.router.navigateByUrl('/tasinmaz-table');
//       });
//   }

//   register(registerUser: RegisterUser) {
//     let headers = new HttpHeaders().set("Content-Type", "application/json");
//     this.httpClient.post(this.path + "register", registerUser, { headers: headers })
//       .subscribe(data => {
//         // Kayıt sonrası yapılacak işlemler
//       });
//   }

//   saveToken(token: string) {
//     localStorage.setItem(this.TOKEN_KEY, token);
//   }

//   logOut() {
//     localStorage.removeItem(this.TOKEN_KEY);
//     this.alertifyService.success("Çıkış yapıldı");
//     this.router.navigateByUrl('/');
//   }

//   loggedIn() {
//     return !this.jwtHelper.isTokenExpired(this.token);
//   }

//   get token() {
//     return localStorage.getItem(this.TOKEN_KEY);
//   }

//   getCurrentUserId() {
//     return this.jwtHelper.decodeToken(this.token).nameid;
//   }
// }






// import { Injectable } from '@angular/core';
// import { LoginUser } from '../models/loginUser';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { JwtHelperService } from '@auth0/angular-jwt';
// import { Router } from '@angular/router';
// import { AlertifyService } from './alertify.service';
// import { RegisterUser } from '../models/registerUser';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   alertify: any;

//   constructor(
//     private httpClient: HttpClient,
//     private router: Router,
//     private alertifyService: AlertifyService
//   ) { }

//   path = "https://localhost:5001/api/Auth/";
//   userToken: any;
//   decodedToken: any;
//   jwtHelper: JwtHelperService = new JwtHelperService();
//   TOKEN_KEY = "token";

//   login(loginUser: LoginUser) {
//     let headers = new HttpHeaders();
//     headers = headers.append("Content-Type", "application/json");
//     this.httpClient
//       .post(this.path + "login", loginUser, { headers: headers })
//       .subscribe((data: any) => {
       
//         if (data) {
//           this.saveToken(data.token);
         
//           const decodedToken = this.jwtHelper.decodeToken(data.token);
//           localStorage.setItem('userId', decodedToken.nameid);
//           localStorage.setItem('role', decodedToken.role); 
//           localStorage.setItem(this.TOKEN_KEY, data.token);
//           //localStorage.setItem(this.ROLE_KEY, decodedToken.role);
          
//           this.router.navigateByUrl("/tasinmaz-table");
//         } else {
//           console.log("Giriş başarısız. Sunucudan null yanıt alındı.");
//         }
//       }, error => {
//         console.log("Giriş başarısız.");
//       });
//   }

//   register(registerUser: RegisterUser) {
//     let headers = new HttpHeaders().set("Content-Type", "application/json");
//     this.httpClient.post(this.path + "register", registerUser, { headers: headers })
//       .pipe(
//         catchError(error => {
//           this.alertifyService.error("Kayıt başarısız");
//           return throwError(error);
//         })
//       )
//       .subscribe(data => {
//         this.alertifyService.success("Kayıt başarılı");
//         // Kayıt sonrası yapılacak işlemler
//       });
//   }

//   saveToken(token: string) {
//     localStorage.setItem(this.TOKEN_KEY, token);
//   }

//   logOut() {
//     localStorage.removeItem(this.TOKEN_KEY);
//     this.alertifyService.success("Çıkış yapıldı");
//     this.router.navigateByUrl('/');
//   }
//   loggedIn() {
//     const token = this.token;
//     return token ? !this.jwtHelper.isTokenExpired(token) : false;
//   }

//   get token() {
//     return localStorage.getItem(this.TOKEN_KEY);
//   }

//   getCurrentUserId() {
//     const token = this.token;
//     return token ? this.jwtHelper.decodeToken(token).nameid : null;
//   }

// get role() {
//   return localStorage.getItem('role');
// }
//  }

import { Injectable } from '@angular/core';
import { LoginUser } from '../models/loginUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';
import { RegisterUser } from '../models/registerUser';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LogService } from './log.service'; // LogService import edildi
import { Log } from '../models/log'; // Log model import edildi

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  alertify: any;
  private logIp = '127.0.0.1'; // Sabit IP

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private alertifyService: AlertifyService,
    private logService: LogService // LogService inject edildi
  ) { }

  path = "https://localhost:5001/api/Auth/";
  userToken: any;
  decodedToken: any;
  jwtHelper: JwtHelperService = new JwtHelperService();
  TOKEN_KEY = "token";

  login(loginUser: LoginUser) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    this.httpClient
      .post(this.path + "login", loginUser, { headers: headers })
      .subscribe((data: any) => {
        if (data) {
          this.saveToken(data.token);
          const decodedToken = this.jwtHelper.decodeToken(data.token);
          localStorage.setItem('userId', decodedToken.nameid);
          localStorage.setItem('role', decodedToken.role);
          localStorage.setItem(this.TOKEN_KEY, data.token);

          // Log işlemi ekleme
          this.logLogin(parseInt(decodedToken.nameid));

          this.router.navigateByUrl("/tasinmaz-table");
        } else {
          console.log("Giriş başarısız. Sunucudan null yanıt alındı.");
        }
      }, error => {
        console.log("Giriş başarısız.");
        // Başarısız giriş logu ekleme
        this.logFailedLogin();
      });
  }

  register(registerUser: RegisterUser): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.httpClient.post<any>(this.path + "register", registerUser, { headers })
      .pipe(
        catchError(error => {
          this.alertifyService.error("Kayıt başarısız");
          return throwError(error);
        })
      );
  }

  saveToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  logOut() {
    const userId = this.getCurrentUserId();
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    this.alertifyService.success("Çıkış yapıldı");

    // Log işlemi ekleme
    this.logLogout(parseInt(userId));

    this.router.navigateByUrl('/');
  }

  loggedIn() {
    const token = this.token;
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUserId() {
    const token = this.token;
    return token ? this.jwtHelper.decodeToken(token).nameid : null;
  }

  get role() {
    return localStorage.getItem('role');
  }

  // Türkiye saatini hesaplayan fonksiyon
  private getTurkeyTime() {
    const now = new Date();
    now.setHours(now.getHours() + 3); // UTC+3 saat dilimini ayarlayın
    return now;
  }
  
  private logLogin(userId: number) {
    const newLog: Log = {
      log_id: 0,
      durum: true,
      islem_tipi: 'Giriş',
      aciklama: 'Kullanıcı giriş yaptı',
      tarih: this.getTurkeyTime(), // Türkiye saatini ekle
      log_ip: this.logIp,
      kullanici_id: userId
    };
    this.logService.addLog(newLog).subscribe(
      response => console.log('Log başarıyla kaydedildi.', response),
      error => {
        console.error('Log kaydedilirken bir hata oluştu:', error);
        // Hata detaylarını konsola yazdırın
        if (error.error) {
          console.error('Hata Detayları:', error.error);
        }
      }
    );
  }

  private logLogout(userId: number) {
    const newLog: Log = {
      log_id: 0,
      durum: true,
      islem_tipi: 'Çıkış',
      aciklama: 'Kullanıcı çıkış yaptı',
      tarih: this.getTurkeyTime(), // Türkiye saatini ekle
      log_ip: this.logIp,
      kullanici_id: userId
    };
    this.logService.addLog(newLog).subscribe(
      response => console.log('Log başarıyla kaydedildi.', response),
      error => {
        console.error('Log kaydedilirken bir hata oluştu:', error);
        // Hata detaylarını konsola yazdırın
        if (error.error) {
          console.error('Hata Detayları:', error.error);
        }
      }
    );
  }

  private logFailedLogin() {
    const newLog: Log = {
      log_id: 0,
      durum: false,
      islem_tipi: 'Giriş',
      aciklama: 'Kullanıcı giriş yapamadı',
      tarih: this.getTurkeyTime(), // Türkiye saatini ekle
      log_ip: this.logIp,
      kullanici_id: null
    };
    this.logService.addLog(newLog).subscribe(
      response => console.log('Log başarıyla kaydedildi.', response),
      error => {
        console.error('Log kaydedilirken bir hata oluştu:', error);
        // Hata detaylarını konsola yazdırın
        if (error.error) {
          console.error('Hata Detayları:', error.error);
        }
      }
    );
  }
}
