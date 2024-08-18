import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Log } from '../models/log';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private apiUrl = 'https://localhost:5001/api/Log'; // API uç noktanızı buraya ekleyin

  constructor(private http: HttpClient) {}

  getLogs(): Observable<Log[]> {
    return this.http.get<Log[]>(`${this.apiUrl}/getLogs`);
  }

  addLog(log: Log): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/add`, log, { headers }).pipe(
      catchError((error) => {
        console.error('Log kaydedilirken bir hata oluştu:', error);
        if (error.error) {
          console.error('Hata Detayları:', error.error);
        }
        return throwError(error);
      })
    );
  }
}
