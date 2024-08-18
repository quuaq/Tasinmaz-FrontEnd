export interface Log {
    log_id: number;         // Log ID
    durum: boolean;        // Durum
    islem_tipi: string;     // İşlem Tipi
    aciklama: string;      // Açıklama
    tarih: Date;           // Tarih
    log_ip: string;         // Log IP
    kullanici_id: number;   // Kullanıcı ID
  }
  