import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private apiUrl = 'http://localhost:3000/';

  constructor(
    private http: HttpClient,
  ) { }

  getData(): Observable<any> {
    const url = this.apiUrl;
    return this.http.get(url)
  }

  getList(): Observable<any> {
    const url = `${this.apiUrl}/list`;
    return this.http.get(url)
  }

  getVariablesById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}/variables`;
    return this.http.get(url)
  }

}
