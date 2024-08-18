// src/app/kullanici-add/kullanici-add.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';
import { Kullanici } from '../models/kullanici';

@Component({
  selector: 'app-kullanici-add',
  templateUrl: './kullanici-add.component.html',
  styleUrls: ['./kullanici-add.component.css']
})
export class KullaniciAddComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<KullaniciAddComponent>,
    private fb: FormBuilder,
    private authService: AuthService,
    private alertify: AlertifyService
  ) {
    this.form = this.fb.group({
      kullanici_name: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  ngOnInit() {}

  onSave(): void {
    if (this.form.valid) {
      const kullanici:Kullanici = this.form.value
      this.authService.register(this.form.value).subscribe(
        response => {
          this.alertify.success('Kullanıcı başarıyla kaydedildi');
          this.dialogRef.close(true);
        },
        error => {
          this.alertify.error('Kullanıcı eklenirken bir hata oluştu');
        }
      );
    } else {
      this.alertify.error('Form geçersiz');
    }
  }
  

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
