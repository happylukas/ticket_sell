import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
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
  private REST_API_SERVER = 'http://localhost:5000/get_tickets'

  constructor(private httpClient: HttpClient) {}

  getTickets(): Observable<any> {
    return this.httpClient.get(this.REST_API_SERVER);
  }
}
