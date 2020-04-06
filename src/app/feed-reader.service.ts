import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedReaderService {

  constructor(private http: HttpClient) {}

  readFeed(source: string): Observable<any> {
    return this.http.post('http://webp.itprof.sk:8000/fetchurl',
      {url: source},
      {
        responseType: 'text',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/rss+xml'
        }
      });
  }
}
