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
export class TransactionsService {
  private REST_API_SERVER = 'https://01d80137f53b.ngrok.io'

  constructor(private httpClient: HttpClient) { }

  getTransactions(): Observable<any> {
    let role_id = JSON.parse(localStorage.getItem('user')).role;
    return this.httpClient.get(`${this.REST_API_SERVER}/get_transactions/${role_id}`);
  }
}
