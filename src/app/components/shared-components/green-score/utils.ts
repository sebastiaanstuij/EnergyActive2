import { Injectable } from '@angular/core';

Injectable();
export class UtilService {
  // helper functions
  percToDeg(perc) {
    return perc * 360;
  }

  percToRad(perc) {
    return this.degToRad(this.percToDeg(perc));
  }

  degToRad(deg) {
    return deg * Math.PI / 180;
  }
}
