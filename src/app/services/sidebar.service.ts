import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CancerAttributes } from '../models/cancerModel';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  private apiUrl = '';
  constructor(private httpClient: HttpClient) {}

  getCancerAttributes(cancerType: string): Observable<string[]> {
    // return this.httpClient.get<string[]>(this.apiUrl);
    return of(this.mockGetCancerAttributes(cancerType));
  }

  mockGetCancerAttributes(cancerType: string): string[] {
    let cancerAttributes: string[] = [];
    switch (cancerType) {
      case 'Breast Cancer':
        cancerAttributes = [
          'Patient Demographics',
          'Class of Case',
          'ICD Site Codes',
          'Histology',
          'Clinical Stage - T',
          'Clinical Stage - N',
          'Clinical Stage - M',
          'Clinical Stage Grouping',
          'Path Stage - T',
          'Path Stage - N',
          'Path Stage - M',
          'Path Stage Grouping',
          'Clinical Grade 8th Edition',
          'Path Grade 8th Edition',
          'Surgery / Procedure',
          'ER / PR / HER2 Status',
          'Chemo',
        ];
        break;
      case 'Lung Cancer':
        cancerAttributes = [
          'Patient Characteristics(lung)',
          'Procedure, Surgery, Therapy (lung)',
        ];
        break;
    }
    return cancerAttributes;
  }
}
