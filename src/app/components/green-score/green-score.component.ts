import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data-service/data.service';
import { Constants } from './constants';
import * as d3 from 'd3';

@Component({
  selector: 'app-green-score',
  providers: [Constants],
  templateUrl: './green-score.component.html',
  styleUrls: ['./green-score.component.scss'],
})
export class GreenScoreComponent implements OnInit {
  text: String = 'green-score';
  dataSource: String = 'mock';
  visualisation;
  chart;


  constructor(private C: Constants, private dataService: DataService) {
    this.visualisation = d3.select('#greenScoreVisualisation')
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .attr('viewBox', '0 0 300 300');

    this.chart = this.visualisation.append('g').attr('transform', 'translate(' +
      (C.WIDTH + C.MARGINS.left) / 2 + ', ' + (C.HEIGHT + C.MARGINS.top) / 2 + ')');
  }

   getData(): void {
    this.dataService.getData(); // then(heroes => this.heroes = heroes);
  }


  ngOnInit() {

    console.log(this.C.labelFormat);
      /**  Script Execution */
        // this.needle = new Needle(90, 10);
        // this.needle.drawOn(this.chart, 0);
        // this.loadDataAndDrawGraph(); // kick off script once before interval is set 
    this.getData();
  }


}
