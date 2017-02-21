import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';

export interface GreenScoreDataResult {
    greenScore: number;
}

@Injectable()
export class DataService {

  constructor(private http: Http) {}

  getLiveGreenScore() {
    return Observable.interval(10000).mergeMap(
      () => this.http.get('greenscore')
      .map(response => {
        return response.json().greenscore;
      })
    );
  }

  // getGreenScore(): Promise<String[]> {
  //   return this.http.get('greenpea.com/api/greenscore')
  //       .toPromise()
  //       .then(response => response.json().data)
  //       .catch(e => this.handleError(e));
  // }

  // private handleError(error: any): Promise<any> {
  //   console.error('An error occurred', error);
  //   return Promise.reject(error.message || error);
  // }


}

