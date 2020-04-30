import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedReaderService {

  constructor(private http: HttpClient) {}

  readFeed(source: string): Observable<any> {
    return this.http.get(source,
      {
        headers: {
          'x-requested-with': source,
        }
      });
  }
}
