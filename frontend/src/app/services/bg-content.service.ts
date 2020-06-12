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
  private REST_API_SERVER = 'https://01d80137f53b.ngrok.io/get_bgcontent';

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) {}

  getBackGround(): Observable<any> {
    // let API_URL = `${this.apiUrl}`;
    return this.httpClient.get(this.REST_API_SERVER);
  }
}
