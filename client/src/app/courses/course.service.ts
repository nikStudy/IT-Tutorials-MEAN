import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Entry } from './entry';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  entryUrl = 'http://localhost:4000/api/entries/';

  constructor(private http: HttpClient) { }

  getEntries(): Observable<[]>{
    return this.http.get<[]>(this.entryUrl);
  }

  courseUrl = 'http://localhost:4000/api';
  getEntryById(EntryId: string): Observable<Entry>{
    return this.http.get<Entry>(this.courseUrl + EntryId + '/');
  }

}
