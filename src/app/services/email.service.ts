import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  headers = new HttpHeaders();

  constructor(private httpClient: HttpClient ) {
    this.headers.set('Accept', 'image/svg+xml');
   }

  send(url: string, data ) {
    return this.httpClient.post(url, data);
  }

  getQR(url: string) {
    return this.httpClient.get(url, { headers: this.headers, responseType: 'text' });
  }

}
