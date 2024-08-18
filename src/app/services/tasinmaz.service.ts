import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tasinmaz } from '../models/tasinmaz';
import { tap } from 'rxjs/operators';
import { LogService } from './log.service'; // LogService import edildi
import { Log } from '../models/log'; // Log model import edildi

@Injectable({
  providedIn: 'root'
})
export class TasinmazService {
  private path = 'https://localhost:5001/api/Tasinmaz';

  constructor(private httpClient: HttpClient, private logService: LogService) { }

  getTasinmazlar(): Observable<Tasinmaz[]> {
    return this.httpClient.get<Tasinmaz[]>(this.path);
  }

  getIller(): Observable<any> {
    return this.httpClient.get<any>(`${this.path}/iller`);
  }

  getIlceler(ilId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.path}/iller/${ilId}/ilceler`);
  }

  getMahalleler(ilceId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.path}/ilceler/${ilceId}/mahalleler`);
  }

  Savecustomer(data: any) {
    return this.httpClient.post(this.path, data).pipe(
      tap(() => this.logTasinmazEkle(data))
    );
  }

  deleteTasinmaz(id: number): Observable<any> {
    return this.httpClient.delete(`${this.path}/${id}`).pipe(
      tap(() => this.logTasinmazSil(id))
    );
  }

  getUserTasinmazlar(userId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.path}/user/${userId}`);
  }

  private logTasinmazEkle(tasinmaz: Tasinmaz) {
    const newLog: Log = {
      log_id: 0,
      durum: true,
      islem_tipi: 'Ekleme',
      aciklama: 'Taşınmaz eklendi',
      tarih: new Date(),
      log_ip: '127.0.0.1',
      kullanici_id: parseInt(localStorage.getItem('userId') || '0', 10)
    };
    this.logService.addLog(newLog).subscribe();
  }

  private logTasinmazSil(tasinmazId: number) {
    const newLog: Log = {
      log_id: 0,
      durum: true,
      islem_tipi: 'Silme',
      aciklama: `Taşınmaz (ID: ${tasinmazId}) silindi`,
      tarih: new Date(),
      log_ip: '127.0.0.1',
      kullanici_id: parseInt(localStorage.getItem('userId') || '0', 10)
    };
    this.logService.addLog(newLog).subscribe();
  }
}
