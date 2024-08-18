// import { Component, OnInit } from '@angular/core';
// import { AlertifyService } from '../services/alertify.service';
// import { Tasinmaz } from '../models/tasinmaz';
// import { TasinmazService } from '../services/tasinmaz.service';
// import { MatDialog } from '@angular/material';
// import { Router } from '@angular/router';
// import { TasinmazaddComponent } from '../tasinmazadd/tasinmazadd.component';
// import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';

// @Component({
//   selector: 'app-tasinmaz-table',
//   templateUrl: './tasinmaz-table.component.html',
//   styleUrls: ['./tasinmaz-table.component.css'],
//   providers: [TasinmazService]
// })
// export class TasinmazTableComponent implements OnInit {
//   tasinmazlar: Tasinmaz[];

//   constructor(private alertifyService: AlertifyService,
//     private tasinmazService: TasinmazService,
//     private dialog: MatDialog,
//     private router: Router) {
//     this.loadTasinmazlar();
//   }

//   ngOnInit() {
//     this.loadTasinmazlar();
//   }

//   loadTasinmazlar() {
//     this.tasinmazService.getTasinmazlar().subscribe(
//       data => {
//         this.tasinmazlar = data;
//       },
//       error => {
//         console.error('Veri çekme hatası:', error);
//       }
//     );
//   }

//   Openpopup() {
//     var _popup = this.dialog.open(TasinmazaddComponent, {
//       width: '60%',
//       data: {
//         title: 'Taşınmaz Ekle'
//       }
//     });

//     _popup.afterClosed().subscribe(result => {
//       if (result) {
//         console.log(result); // Sonuçları loglayın
//         this.loadTasinmazlar(); // Taşınmazları yeniden yükleyin
//       }
//     });
//   }

//   // deleteTasinmaz(id: number) {
//   //   this.tasinmazService.deleteTasinmaz(id).subscribe(() => {
//   //     this.alertifyService.error('Taşınmaz Silindi!');
//   //     this.loadTasinmazlar();
//   //   }, error => {
//   //     console.error('Silme hatası:', error);
//   //   });
//   // }

//   deleteTasinmaz(id: number) {
//     const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
//       width: '250px',
//       data: { title: 'Silme Onayı', message: 'Bu taşınmazı silmek istediğinizden emin misiniz?' }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.tasinmazService.deleteTasinmaz(id).subscribe(() => {
//           this.alertifyService.error('Taşınmaz Silindi!');
//           this.loadTasinmazlar();
//         }, error => {
//           console.error('Silme hatası:', error);
//         });
//       }
//     });
//   }

// }

//YENİ KODLAR
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';
import { Tasinmaz } from '../models/tasinmaz';
import { TasinmazService } from '../services/tasinmaz.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { TasinmazaddComponent } from '../tasinmazadd/tasinmazadd.component';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { MapComponent } from '../map/map.component'; // MapComponent'i içe aktarın
import { AuthService } from '../services/auth.service'; // AuthService'i içe aktarın

@Component({
  selector: 'app-tasinmaz-table',
  templateUrl: './tasinmaz-table.component.html',
  styleUrls: ['./tasinmaz-table.component.css'],
  providers: [TasinmazService]
})
export class TasinmazTableComponent implements OnInit {
  tasinmazlar: Tasinmaz[];
  @ViewChild(MapComponent) mapComponent: MapComponent; // ViewChild kullanarak MapComponent'e erişin

  constructor(
    private alertifyService: AlertifyService,
    private tasinmazService: TasinmazService,
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthService // AuthService'i ekleyin
  ) {}

  ngOnInit() {
    this.loadTasinmazlar();
  }

  loadTasinmazlar() {
    const userId = this.authService.getCurrentUserId();
    const userRole = this.authService.role;

    if (userRole === 'admin') {
      this.tasinmazService.getTasinmazlar().subscribe(
        data => {
          this.tasinmazlar = data;
        },
        error => {
          console.error('Veri çekme hatası:', error);
        }
      );
    } else if (userRole === 'user') {
      this.tasinmazService.getUserTasinmazlar(userId).subscribe(
        data => {
          this.tasinmazlar = data;
        },
        error => {
          console.error('Veri çekme hatası:', error);
        }
      );
    }
  }

  Openpopup() {
    var _popup = this.dialog.open(TasinmazaddComponent, {
      width: '60%',
      data: {
        title: 'Taşınmaz Ekle'
      }
    });

    _popup.afterClosed().subscribe(result => {
      if (result) {
        console.log(result); // Sonuçları loglayın
        this.loadTasinmazlar(); // Taşınmazları yeniden yükleyin
      }
    });
  }

  deleteTasinmaz(id: number) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '250px',
      data: { title: 'Silme Onayı', message: 'Bu taşınmazı silmek istediğinizden emin misiniz?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tasinmazService.deleteTasinmaz(id).subscribe(() => {
          this.alertifyService.error('Taşınmaz Silindi!');
          this.loadTasinmazlar();
        }, error => {
          console.error('Silme hatası:', error);
        });
      }
    });
  }

  showOnMap(koordinat: string): void {
    if (this.mapComponent) {
      const [lat, lon] = koordinat.split(',').map(coord => parseFloat(coord));
      this.mapComponent.setView(lat, lon);
    }
  }
}
