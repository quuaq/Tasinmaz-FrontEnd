import { Component, OnInit } from '@angular/core';
import { LogService } from '../services/log.service';
import { Log } from '../models/log';

@Component({
  selector: 'app-log-islemleri',
  templateUrl: './log-islemleri.component.html',
  styleUrls: ['./log-islemleri.component.css']
})
export class LogIslemleriComponent implements OnInit {
  logs: Log[];
  pagedLogs: Log[];
  currentPage = 0;
  pageSize = 20;
  totalPages: number;

  constructor(private logService: LogService) {}

  ngOnInit() {
    this.loadLogs();
  }

  loadLogs() {
    this.logService.getLogs().subscribe(
      (data: Log[]) => {
        console.log(data); // API'den gelen veriyi konsola yazdırarak kontrol edin
        this.logs = data.reverse(); // Logları ters çevirerek en yeniyi üste taşı
        this.totalPages = Math.ceil(this.logs.length / this.pageSize);
        this.updatePagedLogs();
      },
      error => {
        console.error('Log verilerini çekerken hata oluştu:', error);
      }
    );
  }

  updatePagedLogs() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.pagedLogs = this.logs.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.updatePagedLogs();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePagedLogs();
    }
  }
}
