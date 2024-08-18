// import { Component, Inject, OnInit } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { TasinmazService } from '../services/tasinmaz.service';
// import { AlertifyService } from '../services/alertify.service';

// @Component({
//   selector: 'app-tasinmazadd',
//   templateUrl: './tasinmazadd.component.html',
//   styleUrls: ['./tasinmazadd.component.css']
// })
// export class TasinmazaddComponent implements OnInit {

//   inputdata: any;
//   closemessage = "Closed using directive";
//   form: FormGroup;

//   ilOptions: any[] = [];
//   filteredIlceOptions: any[] = [];
//   filteredMahalleOptions: any[] = [];

//   constructor(
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     private ref: MatDialogRef<TasinmazaddComponent>,
//     private fb: FormBuilder,
//     private tasinmazService: TasinmazService, // Servisi enjekte edin
//     private alertify: AlertifyService // AlertifyService edildi
//   ) {}

//   ngOnInit() {
//     this.inputdata = this.data;
//     this.form = this.fb.group({
//       il: [{value: '', disabled: false}, Validators.required],
//       ilce: [{value: '', disabled: true}, Validators.required],
//       mahalle: [{value: '', disabled: true}, Validators.required],
//       ada: ['', Validators.required],
//       parsel: ['', Validators.required],
//       nitelik: ['', Validators.required],
//       koordinat: ['', Validators.required],
//       adres: ['', Validators.required]
//     });

//     // Şehirleri yükleyin
//     this.tasinmazService.getIller().subscribe(data => {
//       console.log("Iller: ", data); // Veri kontrolü için log ekleyin
//       this.ilOptions = data;
//     }, error => {
//       console.error("Error loading iller: ", error);
//     });

//     // İl değiştiğinde ilçeleri yükleyin
//     this.form.get('il').valueChanges.subscribe(cityId => {
//       this.form.get('ilce').enable(); // İl değiştiğinde ilçe seçeneğini etkinleştirin
//       this.filteredIlceOptions = [];
//       this.filteredMahalleOptions = [];
//       if (cityId) {
//         this.tasinmazService.getIlceler(cityId).subscribe(data => {
//           console.log("Ilceler: ", data); // Veri kontrolü için log ekleyin
//           this.filteredIlceOptions = data;
//         }, error => {
//           console.error("Error loading ilceler: ", error);
//         });
//       }
//     });

//     // İlçe değiştiğinde mahalleleri yükleyin
//     this.form.get('ilce').valueChanges.subscribe(districtId => {
//       this.form.get('mahalle').enable(); // İlçe değiştiğinde mahalle seçeneğini etkinleştirin
//       this.filteredMahalleOptions = [];
//       if (districtId) {
//         this.tasinmazService.getMahalleler(districtId).subscribe(data => {
//           console.log("Mahalleler: ", data); // Veri kontrolü için log ekleyin
//           this.filteredMahalleOptions = data;
//         }, error => {
//           console.error("Error loading mahalleler: ", error);
//         });
//       }
//     });
//   }

//   closepopup() {
//     this.ref.close("Closed using function");
//   }

//   // Saveuser() {
//   //   if (this.form.valid) {
//   //     const formValues = this.form.getRawValue(); // Devre dışı bırakılmış alanlar da dahil olmak üzere ham değerleri alın
//   //     console.log("Form Değerleri: ", formValues); // Form değerlerini loglayın
//   //     this.tasinmazService.Savecustomer(formValues).subscribe(data => {
//   //       console.log("Taşınmaz başarıyla eklendi", data);
//   //       this.ref.close(formValues); // Başarılı yanıt aldığında kapat
//   //     }, error => {
//   //       console.error("Taşınmaz eklenirken hata oluştu: ", error);
//   //     });
//   //   } else {
//   //     console.warn("Form geçerli değil. Mevcut değerler:", this.form.value);
//   //   }
//   // }

// // 
//   Saveuser() {
//     Object.keys(this.form.controls).forEach(field => {
//       const control = this.form.get(field);
//       control.markAsTouched({ onlySelf: true });
//     });

//     if (this.form.valid) {
//       const newTasinmaz = {
//         mahalle_id: parseInt(this.form.get("mahalle").value),
//         ada: this.form.get("ada").value,
//         parsel: this.form.get("parsel").value,
//         nitelik: this.form.get("nitelik").value,
//         adres: this.form.get("adres").value,
//         koordinat: this.form.get("koordinat").value
//       };

//       this.tasinmazService.Savecustomer(newTasinmaz).subscribe(response => {
//         this.alertify.success('Taşınmaz başarıyla kaydedildi');
//         this.closepopup();
//       }, error => {
//         this.alertify.error('Taşınmaz eklenirken bir hata oluştu');
//       });
//     } else {
//      this.alertify.error('Form geçersiz');
//     }
//   }
// }

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasinmazService } from '../services/tasinmaz.service';
import { AlertifyService } from '../services/alertify.service';
import { fromLonLat, toLonLat } from 'ol/proj';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { defaults as defaultControls } from 'ol/control';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';

@Component({
  selector: 'app-tasinmazadd',
  templateUrl: './tasinmazadd.component.html',
  styleUrls: ['./tasinmazadd.component.css']
})
export class TasinmazaddComponent implements OnInit {
  inputdata: any;
  closemessage = "Closed using directive";
  form: FormGroup;

  ilOptions: any[] = [];
  filteredIlceOptions: any[] = [];
  filteredMahalleOptions: any[] = [];
  map: Map;
  markerSource: VectorSource;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<TasinmazaddComponent>,
    private fb: FormBuilder,
    private tasinmazService: TasinmazService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.inputdata = this.data;
    this.form = this.fb.group({
      il: [{ value: '', disabled: false }, Validators.required],
      ilce: [{ value: '', disabled: true }, Validators.required],
      mahalle: [{ value: '', disabled: true }, Validators.required],
      ada: ['', Validators.required],
      parsel: ['', Validators.required],
      nitelik: ['', Validators.required],
      koordinat: ['', Validators.required],
      adres: ['', Validators.required]
    });

    this.tasinmazService.getIller().subscribe(data => {
      console.log("Iller: ", data);
      this.ilOptions = data;
    }, error => {
      console.error("Error loading iller: ", error);
    });

    this.form.get('il').valueChanges.subscribe(cityId => {
      this.form.get('ilce').enable();
      this.filteredIlceOptions = [];
      this.filteredMahalleOptions = [];
      if (cityId) {
        this.tasinmazService.getIlceler(cityId).subscribe(data => {
          console.log("Ilceler: ", data);
          this.filteredIlceOptions = data;
        }, error => {
          console.error("Error loading ilceler: ", error);
        });
      }
    });

    this.form.get('ilce').valueChanges.subscribe(districtId => {
      this.form.get('mahalle').enable();
      this.filteredMahalleOptions = [];
      if (districtId) {
        this.tasinmazService.getMahalleler(districtId).subscribe(data => {
          console.log("Mahalleler: ", data);
          this.filteredMahalleOptions = data;
        }, error => {
          console.error("Error loading mahalleler: ", error);
        });
      }
    });

    this.initMap();
  }

  initMap() {
    this.markerSource = new VectorSource();

    const markerLayer = new VectorLayer({
      source: this.markerSource,
      style: new Style({
        image: new Icon({
          anchor: [0.5, 1],
          anchorXUnits: 'fraction',
          anchorYUnits: 'fraction',
          src: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
        })
      })
    });

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        markerLayer
      ],
      view: new View({
        center: fromLonLat([32.8597, 39.9334]), // Bu koordinatlar doğru yerleştirildi mi kontrol edin
        zoom: 5
      }),
      controls: defaultControls().extend([])
    });

    this.map.on('click', (event) => {
      const coordinate = event.coordinate;
      const transformedCoordinate = toLonLat(coordinate); // Koordinatları EPSG:4326 projeksiyonuna dönüştürme
      console.log('Clicked Coordinate:', transformedCoordinate);

      // Koordinatları doğru sırada set edin: Longitude (Boylam), Latitude (Enlem)
      this.form.controls['koordinat'].setValue(`${transformedCoordinate[1].toFixed(6)},${transformedCoordinate[0].toFixed(6)}`);

      this.addMarker(coordinate);
    });
  }

  addMarker(coordinate: [number, number]) {
    this.markerSource.clear();  
    const marker = new Feature({
      geometry: new Point(coordinate)
    });
    this.markerSource.addFeature(marker);
  }

  closepopup() {
    this.ref.close("Closed using function");
  }

  Saveuser() {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });

    if (this.form.valid) {
      const newTasinmaz = {
        mahalle_id: parseInt(this.form.get("mahalle").value),
        ada: this.form.get("ada").value,
        parsel: this.form.get("parsel").value,
        nitelik: this.form.get("nitelik").value,
        adres: this.form.get("adres").value,
        koordinat: this.form.get("koordinat").value
      };

      this.tasinmazService.Savecustomer(newTasinmaz).subscribe(response => {
        this.alertify.success('Taşınmaz başarıyla kaydedildi');
        this.closepopup();
      }, error => {
        this.alertify.error('Taşınmaz eklenirken bir hata oluştu');
      });
    } else {
      this.alertify.error('Form geçersiz');
    }
  }
}
//DoğRu yer