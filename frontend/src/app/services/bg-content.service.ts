import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BgContentService {
  apiUrl: string = 'localhost:5000';

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  getBackGround(): Observable<any> {
    // let API_URL = `${this.apiUrl}`;
    return this.http.get(this.apiUrl);
  }
}
