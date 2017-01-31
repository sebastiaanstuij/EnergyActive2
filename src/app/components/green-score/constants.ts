import { Injectable } from '@angular/core';
import * as d3 from 'd3';

Injectable();
export class Constants {
    WIDTH = 300;
    HEIGHT = 300;
    MARGINS = {
       top: 20,
       right: 20,
       bottom: 30,
       left: 20
      };
    radius = Math.min(this.WIDTH, this.HEIGHT) / 2;
    totalPercent = 0.75;
    numSections = 3;
    sectionPerc = 1 / this.numSections / 2;
    padRad = 0.05;
    chartInset = 10;
    barWidth = 40;
    majorTicks = 1;
    minAngle = -90;
    maxAngle = 90;
    minValue = 0;
    maxValue = 10;
    labelFormat = d3.format(',g');
    labelInset = 10;
    ticks;
    tickData;
    range = this.maxAngle - this.minAngle;
    r = 200 / 2;
    interval = 1000 * 60 * 5; // update interval: 5minutes

    // a linear scale that maps domain values to a percent from 0..1
    scale = d3.scaleLinear()
            .range([0, 1])
            .domain([this.minValue, this.maxValue]);
}
