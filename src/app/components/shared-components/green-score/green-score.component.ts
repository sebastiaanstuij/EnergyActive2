import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../../../services/data-service/data.service';
import { Constants } from './constants';
import { UtilService } from './utils';
import { Needle } from './needle';
import { Subscription } from 'rxjs';
import * as d3 from 'd3';

@Component({
  selector: 'app-green-score',
  providers: [Constants, UtilService],
  templateUrl: './green-score.component.html',
  styleUrls: ['./green-score.component.scss'],
})
export class GreenScoreComponent implements OnInit, AfterViewInit, OnDestroy {
  container;
  visualization;
  myTimer;
  needle: Needle;
  ticks;
  dataSubscription: Subscription;
  greenscore;
  // tickData;

  @ViewChild('greenScoreVisualization')
  visualizationContainer: ElementRef;

  // a linear scale that maps domain values between 0 - 1
  scale = d3.scaleLinear().range([0, 1]).domain([this.C.minValue, this.C.maxValue]);


  constructor(private C: Constants, private utils: UtilService, private dataService: DataService) {
    // TypeScript + ES6 dependency injection
  }

  ngOnInit() {
    // do D3 related things after view has been initialized => ngAfterViewInit ()
  }

  ngAfterViewInit() {
    let element = this.visualizationContainer.nativeElement;
    this.container = d3.select(element).append('svg')
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .attr('viewBox', '0 0 300 300'); // TODO: viewbox still necessary?

    this.visualization = this.container.append('g').attr('transform', 'translate(' +
      (this.C.WIDTH + this.C.MARGINS.left) / 2 + ', ' + (this.C.HEIGHT + this.C.MARGINS.top) / 2 + ')');

    this.setup();
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

  private setup(): void {
    for (let i = 1; i <= this.C.numSections; i++) {
      let arcStartRad = this.utils.percToRad(this.C.totalPercent);
      let arcEndRad = arcStartRad + this.utils.percToRad(this.C.sectionPerc);
      this.C.totalPercent += this.C.sectionPerc;
      let startPadRad = i === 0 ? 0 : this.C.padRad / 2;
      let endPadRad = i === this.C.numSections ? 0 : this.C.padRad / 2;

      this.ticks = this.scale.ticks(this.C.majorTicks);
      // this.tickData = d3.range(this.C.majorTicks); // .map(function() { return 1 / this.C.majorTicks; });

      let arc = d3.arc()
        .outerRadius(this.C.radius - this.C.chartInset)
        .innerRadius(this.C.radius - this.C.chartInset - this.C.barWidth)
        .startAngle(arcStartRad + startPadRad)
        .endAngle(arcEndRad - endPadRad);
      this.visualization.append('path')
        .attr('class', 'arc chart-color' + i)
        .attr('d', arc);
    }

    let lg = this.visualization.append('g')
      .attr('class', 'label');
    // .attr('transform', centerTx);

    lg.selectAll('text')
      .data(this.ticks)
      .enter().append('text')
      .attr('transform', (d) => {
        let ratio = this.scale(d);
        let newAngle = this.C.minAngle + (ratio * this.C.range);
        return 'rotate(' + newAngle + ') translate(0,' + (this.C.labelInset - this.C.r) + ')';
      })
      .text(this.C.labelFormat);

    this.needle = new Needle(90, 10);
    this.needle.drawOn(this.visualization, 0);
    this.loadDataAndDrawGraph();
  }

  private loadDataAndDrawGraph(): void {
    this.dataSubscription = this.dataService.getLiveGreenScore()
      .subscribe(greenscore => {
        this.greenscore = greenscore;
        let percent = (greenscore * 20) / 100;
        this.needle.animateOn(this.visualization, percent);
      });
  }

}
