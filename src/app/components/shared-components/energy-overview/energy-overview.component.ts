import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Constants } from './constants';
import { DataService } from '../../../services/data-service/data.service';
import { MapperService } from '../../../services/mapper-service/mapper.service';

import { Subscription } from 'rxjs';
import * as d3 from 'd3';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-energy-overview',
  providers: [Constants],
  templateUrl: './energy-overview.component.html',
  styleUrls: ['./energy-overview.component.scss']
})
export class EnergyOverviewComponent implements OnInit, AfterViewInit {
  container;
  visualization;
  // startDay = moment().subtract(2, 'days').format('YYYY-MM-DD');
  // endDay = moment().format('YYYY-MM-DD');
  dataSubscription: Subscription;

  xScale;
  yScale;
  xAxis;
  yAxis;
  verticalLine;

  @ViewChild('energyOverviewVisualization')
  visualizationContainer: ElementRef;


  constructor(private C: Constants, private dataService: DataService, private mapperService: MapperService) {
    // TypeScript + ES6 dependency injection
  }

  ngOnInit() {
    // do D3 related things after view has been initialized => ngAfterViewInit ()
  }

  ngAfterViewInit() {
    let element = this.visualizationContainer.nativeElement;
    this.container = d3.select(element).append('svg')
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .attr('viewBox', '0 0 900 550'); // TODO: viewbox still necessary?

    this.visualization = this.container.append('g');
    this.loadData();
  }

  private loadData(): void {
    this.dataSubscription = this.dataService.getOverviewData()
      .subscribe(data => {
        let transformedData = this.mapperService.transformdata(data);
        this.setupGraphLayout(transformedData);
        this.drawGraph(transformedData);
      });
  }

  private setupGraphLayout(data): void {
    // get min and max dates - this assumes data is sorted
    let minDate = data.wind_energy[0].date;
    let maxDate = data.wind_energy[data.wind_energy.length - 1].date;

    this.xScale = d3.scaleTime().domain([minDate, maxDate]).range([this.C.MARGINS.left, this.C.WIDTH - this.C.MARGINS.right]);

    // create an array of all values so that a min and max value can be determined
    // todo: find more efficient way
    let minMaxData = [];
    for (let key of data) {
      minMaxData.push.apply(minMaxData, _.map(data[key], 'value'));
    }

    this.yScale = d3.scaleLinear().range([this.C.HEIGHT - this.C.MARGINS.bottom, this.C.MARGINS.top])
      .domain([0, d3.max(minMaxData) + 100]); // %

    // create rectangular background (filled with grey color)
    this.visualization.append('rect')
      .attr('class', 'background');
    // create x-axis
    this.xAxis = d3.axisBottom(this.xScale);
    // create y-axis
    this.yAxis = d3.axisLeft(this.yScale);

    // Add title
    // this.visualization.append('svg:text')
    //   .attr('class', 'graph-title')
    //   .attr('x', this.C.MARGINS.left)
    //   .attr('y', this.C.MARGINS.top / 2)
    //   .text('Energy Active Dashboard');

    // add y-axis label
    this.visualization.append('text')
      .attr('class', 'axis-label y-axis-label')
      .attr('text-anchor', 'end')
      .attr('transform', 'rotate(-90)')
      .attr('y', this.C.MARGINS.left - 70)
      .attr('x', -((this.C.HEIGHT / 2) - this.C.MARGINS.bottom))
      .attr('dy', '.75em')
      .text('Energy in Watts');

    // add x-axis label
    let dateToday = moment().format('dddd, MMMM Do YYYY');
    this.visualization.append('text')
      .attr('class', 'axis-label x-axis-label')
      .attr('text-anchor', 'end')
      .attr('y', this.C.HEIGHT - (this.C.MARGINS.bottom / 2) + 20)
      .attr('x', this.C.WIDTH / 2 + this.C.MARGINS.left)
      .attr('dy', '.75em')
      .text(dateToday);
  }

  private drawGraph(data): void {

  }

}
