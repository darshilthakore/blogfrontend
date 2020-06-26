import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../shared/login';
import { Observable } from 'rxjs';
import { baseURL } from '../shared/baseurl';
import { Registration } from '../shared/registration';
import { map, catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient) { }

  registerUser(registration: Registration): Observable<Registration> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<Registration>(baseURL + 'api/register/', registration, httpOptions);
  }

  loginUser(login: Login): Observable<Login> {
    return this.http.post<Login>(baseURL + 'auth/', login);
  }
}
