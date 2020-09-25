import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Author,
  Category
} from '../models/videos.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideosService {
  constructor(private http: HttpClient) {
  }

  public getAuthors(): Observable<Author[]> {
    const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get<Author[]>('http://localhost:3000/authors', {headers});
  }

  public getAuthor(authorId: number): Observable<Author> {
    const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get<Author>(`http://localhost:3000/authors/${authorId}`, {headers});
  }

  public updateAuthor(author: Author): Observable<Author> {
    const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.put<Author>(`http://localhost:3000/authors/${author.id}`, author, {headers});
  }

  public getCategories(): Observable<Category[]> {
    const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get<Category[]>('http://localhost:3000/categories', {headers});
  }
}
