import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Blog } from '../shared/blog';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  
  public mysubject = new Subject();

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

    // return blog with id
    getBlog(id): Observable<Blog> {
      return this.http.get<Blog>(baseURL + 'api/blogs/' + id, this.getAuthHeaders());
    }

    // return all the blogs
    getBlogs(): Observable<Blog[]> {
      return this.http.get<Blog[]>(baseURL + 'api/blogs/', this.getAuthHeaders());
    }

    // for creating a new blog
    createBlog(blog: Blog): Observable<Blog> {
      return this.http.post<Blog>(baseURL + 'api/blogs/', blog, this.getAuthHeaders());
    }

    //delete blog
    deleteBlog(id) {
      return this.http.delete<any>(baseURL + 'api/blogs/' + id, this.getAuthHeaders());
    }

    //update blog
    updateBlog(id, blog): Observable<Blog> {
      return this.http.put<Blog>(baseURL + 'api/blogs/' + id + '/', blog, this.getAuthHeaders());
    }
}

