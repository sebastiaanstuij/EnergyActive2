import * as d3 from 'd3';
import { UtilService } from './utils';
import { ReflectiveInjector } from '@angular/core';

export class Needle {

    len: Number;
    radius: Number;
    utils: UtilService;

    constructor(len: Number, radius1: Number) {
        // this is 'normal' Class construction, so no TypeScript DI
        this.len = len;
        this.radius = radius1;

        // Inject UtilService manually due to constructor with 'normal' parameters
        let injector = ReflectiveInjector.resolveAndCreate([UtilService]);
        this.utils = injector.get(UtilService);
    }

    drawOn = function (el, perc): Function {
        el.append('circle').attr('class', 'needle-center').attr('cx', 0).attr('cy', 0).attr('r', this.radius);
        return el.append('path').attr('class', 'needle').attr('d', this.mkCmd(perc));
    };

    animateOn = function (el, perc): Function {
        let self = this;
        return el.transition().delay(500).ease(d3.easeBackOut).duration(3000).selectAll('.needle')
        .tween('progress', function () {
            // Don't use arrow function because you want the D3 selection that is referred to
            // in this callback to be 'this' not the lexical scope
            return (percentOfPercent) => {
                // Do use arrow function (ES6) to keep reference to lexical scoped 'this' (above selected element by D3)
                let progress;
                progress = percentOfPercent * perc;
                return d3.select(this).attr('d', self.mkCmd(progress));
            };
        });
    };

    mkCmd = function (perc): String {
        let centerX, centerY, leftX, leftY, rightX, rightY, thetaRad, topX, topY;
        thetaRad = this.utils.percToRad(perc / 2);
        centerX = 0;
        centerY = 0;
        topX = centerX - this.len * Math.cos(thetaRad);
        topY = centerY - this.len * Math.sin(thetaRad);
        leftX = centerX - this.radius * Math.cos(thetaRad - Math.PI / 2);
        leftY = centerY - this.radius * Math.sin(thetaRad - Math.PI / 2);
        rightX = centerX - this.radius * Math.cos(thetaRad + Math.PI / 2);
        rightY = centerY - this.radius * Math.sin(thetaRad + Math.PI / 2);
        return 'M ' + leftX + ' ' + leftY + ' L ' + topX + ' ' + topY + ' L ' + rightX + ' ' + rightY;
    };
}
