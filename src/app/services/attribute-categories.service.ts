import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttributeCategoriesService {

  constructor(
    private http: HttpClient,
  ) { }

  getAttributeSubCategories(): Observable<string[]> {
    const url = 'http://localhost:3000/';
    // return this.http.get(url);
    return of(['Race', 'Ethnicity']);
  }
}
