import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Kullanici } from '../models/kullanici';

@Injectable({
  providedIn: 'root'
})
export class KullaniciService {
  private apiUrl = 'https://localhost:5001/api/Users';

  constructor(private http: HttpClient) { }

  getKullanicilar(): Observable<Kullanici[]> {
    return this.http.get<Kullanici[]>(this.apiUrl);
  }

  deleteKullanici(userId: number): Observable<void> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.delete<void>(url);
  }
}
