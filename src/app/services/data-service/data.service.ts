import { Injectable } from '@angular/core';


export interface GreenScoreDataResult {
    greenScore: number;
}

@Injectable()
export class DataService {

  testData = {
    greenScore: 3.4
  };

  getLiveGreenScore(): Promise<any> {
     return new Promise((resolve, reject) => resolve(this.testData));
  } // stub



}

