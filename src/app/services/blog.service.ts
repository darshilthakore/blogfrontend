import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../shared/blog';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private http: HttpClient) { }

    private getAuthHeaders() {
      const token = localStorage.getItem('token');
      const httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token
      });
      return { headers: httpHeaders};
    }


    getBlogs(): Observable<Blog[]> {
      return this.http.get<Blog[]>(baseURL + 'api/blogs', this.getAuthHeaders());
    }
}

