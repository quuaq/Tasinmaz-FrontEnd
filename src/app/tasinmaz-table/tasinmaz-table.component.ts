import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';



@Component({
  selector: 'app-tasinmaz-table',
  templateUrl: './tasinmaz-table.component.html',
  styleUrls: ['./tasinmaz-table.component.css']
})
export class TasinmazTableComponent implements OnInit {

  constructor(private alertifyService : AlertifyService) { }
  

  ngOnInit() {
  }



  addToEstate(){
    this.alertifyService.success("Taşınmaz Eklendi")
  }
  
  deleteToEstate(){
    this.alertifyService.error("Taşınmaz Silindi!")
  }

  updateToEstate(){
    this.alertifyService.warning("Taşınmazlar Güncellendi.");
  }
}
