import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketSaleService {
  private REST_API_SERVER = 'https://01d80137f53b.ngrok.io'

  constructor(private httpClient: HttpClient) {}

  getTickets(): Observable<any> {
    return this.httpClient.get(`${this.REST_API_SERVER}/get_tickets`);
  }

  payment(data:any): Observable<any> {
    console.log(data);
    return this.httpClient.post(`${this.REST_API_SERVER}/payment`, data).pipe(
      map((data) => {
        return data;
      })
    );
    
  }
}
