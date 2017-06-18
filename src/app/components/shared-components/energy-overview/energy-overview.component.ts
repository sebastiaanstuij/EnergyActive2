import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Constants } from './constants';
import { DataService } from '../../../services/data-service/data.service';
import { MapperService } from '../../../services/mapper-service/mapper.service';

import { Subscription } from 'rxjs';
import * as d3 from 'd3';
import * as moment from 'moment';
import * as _ from 'lodash';

export interface EnergyDataType {
    date: any;
    value: any;
};

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

    // declare global color codes for legend
    color_codes = {
        'green_energy': '#00E676',
        'wind_energy': '#00BCD4',
        'sun_energy': '#FFEB3B',
        'energy_consumption': '#FF5722'
    };

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
            .attr('viewBox', '0 0 900 550');

        this.visualization = this.container.append('g');

        this.loadData();
    }


    ngOnDestroy() {
        this.dataSubscription.unsubscribe();

        if (this.visualization.empty && !this.visualization.empty()) {
            this.visualization.selectAll('*').remove();
        }
    }

    private loadData(): void {
        // d3.select('svg').remove();
        this.dataSubscription = this.dataService.getEnergyData()
            .subscribe(data => {
                let transformedData = this.mapperService.transformdata(data);
                this.setupGraphLayout(transformedData);
                this.drawGraph(transformedData);
            });
    }

    private setupGraphLayout(data): void {
        // first clean up D3 related DOM elements // TODO: divide setup in static and dynamic D3 drawing part
        this.visualization.selectAll('*').remove();

        // get min and max dates - this assumes data is sorted
        let minDate = data.wind_energy[0].date;
        let maxDate = data.wind_energy[data.wind_energy.length - 1].date;

        this.xScale = d3.scaleTime().domain([minDate, maxDate]).range([this.C.MARGINS.left, this.C.WIDTH - this.C.MARGINS.right]);

        // create an array of all values so that a min and max value can be determined
        // todo: find more efficient way
        let minMaxData = [];
        for (let key of Object.keys(data)) {
            minMaxData.push.apply(minMaxData, _.map(data[key], 'value'));
        }

        this.yScale = d3.scaleLinear().range([this.C.HEIGHT - this.C.MARGINS.bottom, this.C.MARGINS.top])
            .domain([0, d3.max(minMaxData) + 100]); // %

        // create rectangular background (filled with grey color)
        this.visualization.append('rect')
            .attr('class', 'graph-background');

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
        let that = this;

        // create a line generator object
        let lineGen = d3.line<EnergyDataType>()
            .x(function (d) {
                return that.xScale(d.date);
            })
            .y(function (d) {
                return that.yScale(d.value);
            })
            .curve(d3.curveBasis); // adds smoothing

        // create an area generator object
        let areaGen = d3.area<EnergyDataType>()
            .x(function (d) {
                return that.xScale(d.date);
            })
            .y0(this.C.HEIGHT - this.C.MARGINS.bottom)
            .y1(function (d) {
                return that.yScale(d.value);
            })
            .curve(d3.curveBasis); // adds smoothing

        // append green energy
        this.visualization.append('svg:path')
            .data([data.green_energy])
            .attr('class', 'area')
            .attr('id', 'area_green_energy')
            .attr('d', areaGen)
            .attr('fill', 'none'); // TODO: add smoothing?

        // append sun energy
        this.visualization.append('svg:path')
            .data([data.sun_energy])
            .attr('class', 'area')
            .attr('id', 'area_sun_energy')
            .attr('d', areaGen)
            .attr('fill', 'none')
            .style('opacity', 0);

        // append consumption-energy data line to graph
        this.visualization.append('svg:path')
            .data([data.energy_consumption])
            .attr('class', 'line')
            .attr('id', 'line_energy_consumption')
            .attr('d', lineGen)
            .attr('fill', 'none');

        // create mouseover area
        this.visualization.append('svg:rect')
            .attr('width', this.C.WIDTH - this.C.MARGINS.right - this.C.MARGINS.left)
            .attr('height', this.C.HEIGHT - this.C.MARGINS.bottom - this.C.MARGINS.top)
            .attr('fill', 'none')
            .attr('pointer-events', 'all')
            .attr('transform', 'translate(' + (this.C.MARGINS.left) + ', ' + (this.C.MARGINS.top) + ')')
            .on('mouseover', function () {
                // moveLine();
                d3.select('#area_green_energy').style('fill', '#00BCD4');
                d3.select('#area_sun_energy').style('opacity', 1);
                d3.select('#legend_rect_green_energy').style('opacity', 0);
                d3.select('#legend_text_green_energy').style('opacity', 0);
                d3.select('#legend_rect_wind_energy').style('opacity', 1)
                    .attr('transform', 'translate(0, -20)');
                d3.select('#legend_text_wind_energy').style('opacity', 1)
                    .attr('transform', 'translate(0, -20)');
                d3.select('#legend_rect_sun_energy').style('opacity', 1)
                    .attr('transform', 'translate(0, -20)');
                d3.select('#legend_text_sun_energy').style('opacity', 1)
                    .attr('transform', 'translate(0, -20)');
            })
            .on('mousemove', function () {
                // moveLine();  // TODO: resolve flickering screen due to moveline
            })
            .on('mouseout', function () {
                // verticalLine.style('opacity', 0);
                d3.select('#area_green_energy').style('fill', '#00E676');
                d3.select('#area_sun_energy').style('opacity', 0);
                d3.select('#legend_rect_green_energy').style('opacity', 1);
                d3.select('#legend_text_green_energy').style('opacity', 1);
                d3.select('#legend_rect_wind_energy').style('opacity', 0)
                    .attr('transform', 'translate(0, 20)');
                d3.select('#legend_text_wind_energy').style('opacity', 0)
                    .attr('transform', 'translate(0, 20)');
                d3.select('#legend_rect_sun_energy').style('opacity', 0)
                    .attr('transform', 'translate(0, 20)');
                d3.select('#legend_text_sun_energy').style('opacity', 0)
                    .attr('transform', 'translate(0, 20)');
            });

        // add a vertical line, which will appear on mouseover/mousemove events
        // let verticalLine = this.visualization
        //     .append('line')
        //     .attr('class', 'vertical-line')
        //     .attr('transform', 'translate(' + (this.C.MARGINS.left) + ', ' + (0) + ')')
        //     .attr({
        //         'x1': 0,
        //         'y1': this.C.MARGINS.top,
        //         'x2': 0,
        //         'y2': this.C.HEIGHT - this.C.MARGINS.bottom
        //     });

        // let moveLine = function () {
        // let mousex = d3.mouse(this.visualisation.node())[0];
        // verticalLine
        //     .attr('transform', function () {
        //         return 'translate(' + mousex + ',0)';
        //     })
        //     .style('opacity', 1);
        // };


        // append xAxis to visualisation object and transform xAxis to bottom of canvas (plot later because of plot order)
        this.visualization.append('svg:g')
            .attr('class', 'axis x-axis')
            .attr('transform', 'translate(0,' + (this.C.HEIGHT - this.C.MARGINS.bottom) + ')')
            .call(this.xAxis);

        // append yAxis to visualisation object and transform yAxis to left of canvas (plot later because of plot order)
        this.visualization.append('svg:g')
            .attr('class', 'axis y-axis')
            .attr('transform', 'translate(' + (this.C.MARGINS.left) + ', ' + (0) + ')')
            .call(this.yAxis);

        // add legend
        let legend = this.visualization
            .append('g')
            .attr('class', 'legend')
            .attr('height', 100)
            .attr('width', 100)
            .attr('transform', 'translate(' + (this.C.WIDTH - 20) + ', ' + this.C.MARGINS.top + ')');

        let legendKeys = [{ key: 'energy_consumption', value: 'consumption' },
        { key: 'green_energy', value: 'green energy' },
        { key: 'wind_energy', value: 'wind energy' },
        { key: 'sun_energy', value: 'sun energy' }];

        legend.selectAll('rect')
            .data(legendKeys)
            .enter()
            .append('rect')
            .attr('id', function (k) {
                return 'legend_rect_' + k.key;
            })
            .attr('x', 0)
            .attr('y', function (k, i) {
                return i * 20;
            })
            .attr('width', 10)
            .attr('height', 10)
            .attr('fill', function (k) {
                return that.color_codes[k.key];
            })
            .attr('opacity', function (k) {
                if (k.key === 'wind_energy' || k.key === 'sun_energy') {
                    return 0;
                } else {
                    return 1;
                }
            })
            .on('click', function (k) {
                let active = k.active ? false : true;
                let opacity = active ? 0 : 1;
                d3.select('#line_' + k.key).style('opacity', opacity);
                d3.select('#area_' + k.key).style('opacity', opacity);
                k.active = active;
            });

        legend.selectAll('text')
            .data(legendKeys)
            .enter()
            .append('text')
            .attr('id', function (k) {
                return 'legend_text_' + k.key;
            })
            .attr('id', function (k) {
                return 'legend_text_' + k.key;
            })
            .attr('x', 15)
            .attr('y', function (k, i) {
                return (i * 20) + 8;
            })
            .attr('opacity', function (k) {
                if (k.key === 'wind_energy' || k.key === 'sun_energy') {
                    return 0;
                } else {
                    return 1;
                }
            })
            .text(function (k) {
                return k.value;
            });

        // // tooltip behaviour
        // let focus = this.visualization.append('g')
        //   .attr('class', 'focus')
        //   .style('display', 'none');

        // focus.append('circle')
        //   .attr('r', 6.5);

        // focus.append('text')
        //   .attr('x', 9)
        //   .attr('dy', '.35em');

        // function mousemove() {
        //   let x0 = this.xScale.invert(d3.mouse(this)[0]),
        //       i = bisectDate(data, x0, 1),
        //       d0 = data[i - 1],
        //       d1 = data[i],
        //       d = x0 - d0.date > d1.value.date - x0 ? d1 : d0;
        //   focus.attr('transform', 'translate(' + this.xScale(d.date) + ',' + this.yScale(d.value) + ')');
        //   focus.select('text').text(d.value);
        // }


    }

}
