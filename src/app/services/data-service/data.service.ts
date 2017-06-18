import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';

// export type OverviewDataType = { 

// };

// export interface GreenScoreDataType {
//     greenScore: number;
// }

@Injectable()
export class DataService {

  constructor(private http: Http) {}

  getEnergyData(): Observable<any> {
    return Observable.interval(30000).startWith(0).mergeMap(
      () => this.http.get('EnergyData')
      .map(response => {
        return response.json();
      })
    );
  }
}

