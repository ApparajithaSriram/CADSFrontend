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

  getTotalCount(minYear: number, maxYear: number): Observable<any> {
    const reqBody = { minYear: minYear.toString(), maxYear: maxYear.toString() }
    const url = 'http://localhost:3000/total-cancer-counts';
    return this.http.post(url, reqBody);
  }

  getAllNameTypes(minYear: number, maxYear: number): Observable<any> {
    const reqBody = { minYear: minYear.toString(), maxYear: maxYear.toString() }
    const url = 'http://localhost:3000/nametypes';
    return this.http.post(url, reqBody);
    // return of(['Race', 'Ethnicity']);
  }
}
