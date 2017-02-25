import { Component, OnInit, AfterViewInit, ElementRef, ViewChild} from '@angular/core';
import { Constants } from './constants';
import { DataService } from '../../../services/data-service/data.service';
import { Subscription } from 'rxjs';
import * as d3 from 'd3';

@Component({
  selector: 'app-energy-overview',
  providers: [Constants],
  templateUrl: './energy-overview.component.html',
  styleUrls: ['./energy-overview.component.scss']
})
export class EnergyOverviewComponent implements OnInit, AfterViewInit {
  container;
  visualization;
  // startDay = moment().subtract(2, 'days').format("YYYY-MM-DD");
  // endDay = moment().format("YYYY-MM-DD");
  dataSubscription: Subscription;
  data;

  xScale;
  yScale;
  xAxis;
  yAxis;
  verticalLine;

  @ViewChild('energyOverviewVisualization')
  visualizationContainer: ElementRef;


  constructor(private C: Constants, private dataService: DataService) {
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

    this.setup();
  }

  private setup(): void {
    // let minDate = data.wind_energy[0].date,
    //             maxDate = data.wind_energy[data.wind_energy.length - 1].date;

    //         xScale = d3.time.scale().domain([minDate, maxDate]).range([MARGINS.left, WIDTH - MARGINS.right]);

    this.loadDataAndDrawGraph();
  }

  private loadDataAndDrawGraph(): void {
    this.dataSubscription = this.dataService.getOverviewData()
      .subscribe(data => {
        this.data = data;
      });
  }

}
