import { Injectable } from '@angular/core';
import { Entry } from './entry';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  entryUrl = 'http://localhost:4000/api/entries/';

  constructor(private http: HttpClient) { }

  getEntries(): Observable<Entry[]>{
    return this.http.get<Entry[]>(this.entryUrl);
  }

  getEntryById(EntryId: string): Observable<Entry>{
    return this.http.get<Entry>(this.entryUrl + EntryId + '/');
  }

  createEntry (entry: Entry, fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('title', entry.title);
    formData.append('short_descrip', entry.short_descrip);
    formData.append('full_descrip', entry.full_descrip);
    formData.append('entryImage', fileToUpload, fileToUpload == null ? null : fileToUpload.name);
    formData.append('author', entry.author);
    return this.http.post(this.entryUrl, formData);
  }

  updateEntry (entry: Entry, EntryId: string) {
    return this.http.put(this.entryUrl + EntryId + '/', entry);
  }

  updateImage (EntryId: string, fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('entryImage', fileToUpload, fileToUpload == null ? null : fileToUpload.name);
    return this.http.put(this.entryUrl + 'updateImage/' + EntryId + '/', formData);
  }

  deleteEntry (EntryId: string) {
    return this.http.delete(this.entryUrl + EntryId + '/');
  }

}
