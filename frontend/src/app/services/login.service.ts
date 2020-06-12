import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private REST_API_SERVER = 'https://01d80137f53b.ngrok.io/login';

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    let data = {
      username: username,
      password: password,
    };
    return this.httpClient.post(this.REST_API_SERVER, data).pipe(
      map((data: any) => {
        console.log(data);
        localStorage.setItem('user', JSON.stringify(data.user));
        return data;
      })
    );
  }
}
