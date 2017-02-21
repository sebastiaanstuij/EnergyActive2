import { Injectable } from '@angular/core';
import * as d3 from 'd3';

Injectable();
export class Constants {
  WIDTH = 800;
  HEIGHT = 500;
  MARGINS = {
    top: 75,
    right: 30,
    bottom: 50,
    left: 95
  };

  interval = 1000 * 60 * 5; // update interval: 5minutes

  color_codes = {
      'green_energy': '#3BC443',
      'wind_energy': '#1EB2CE',
      'sun_energy': '#FFF500',
      'energy_consumption': '#FF9232'
  };
}
