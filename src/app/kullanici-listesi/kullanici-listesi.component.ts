import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { KullaniciService } from '../services/kullanici.service';
import { Kullanici } from '../models/kullanici';
import { KullaniciAddComponent } from '../kullanici-add/kullanici-add.component';
import { AlertifyService } from '../services/alertify.service';
import { LogService } from '../services/log.service'; // LogService import edildi
import { Log } from '../models/log'; // Log model import edildi

@Component({
  selector: 'app-kullanici-listesi',
  templateUrl: './kullanici-listesi.component.html',
  styleUrls: ['./kullanici-listesi.component.css']
})
export class KullaniciListesiComponent implements OnInit {
  kullanicilar: Kullanici[];
  selectedUsers = new Set<number>();
  logs: Log[]; // Logları saklamak için dizi

  constructor(
    private kullaniciService: KullaniciService,
    public dialog: MatDialog,
    private alertify: AlertifyService,
    private logService: LogService // LogService inject edildi
  ) { }

  ngOnInit(): void {
    this.loadKullanicilar();
    this.loadLogs(); // Logları yükleyin
  }

  loadKullanicilar() {
    this.kullaniciService.getKullanicilar().subscribe(
      (data: Kullanici[]) => {
        this.kullanicilar = data; 
      },
      error => {
        console.error("Kullanıcıları alırken bir hata oluştu: ", error);
      }
    );
  }

  loadLogs() {
    this.logService.getLogs().subscribe(
      (data: Log[]) => {
        this.logs = data.sort((a, b) => new Date(b.tarih).getTime() - new Date(a.tarih).getTime());
      },
      error => {
        console.error("Logları alırken bir hata oluştu: ", error);
      }
    );
  }

  onSelectUser(userId: number, isSelected: boolean) {
    if (isSelected) {
      this.selectedUsers.add(userId);
    } else {
      this.selectedUsers.delete(userId);
    }
  }

  deleteSelectedUsers() {
    this.selectedUsers.forEach(userId => {
      this.kullaniciService.deleteKullanici(userId).subscribe(() => {
        this.loadKullanicilar();
        this.loadLogs(); // Logları yeniden yükleyin
        this.alertify.success("Kullanıcı başarıyla silindi.");
      }, error => {
        console.error("Kullanıcı silinirken bir hata oluştu: ", error);
        this.alertify.error("Kullanıcı silinirken bir hata oluştu.");
      });
    });
    this.selectedUsers.clear();
  }

  addUser(): void {
    console.log("Kullanıcı Ekle butonuna tıklandı");
    const dialogRef = this.dialog.open(KullaniciAddComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadKullanicilar(); // Yeni kullanıcı eklendikten sonra listeyi yenileyin
        this.loadLogs(); // Logları yeniden yükleyin
      }
    });
  }
}
