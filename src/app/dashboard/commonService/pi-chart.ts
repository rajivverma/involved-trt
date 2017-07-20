import { NgModule, Injectable } from '@angular/core';

@Injectable()
export class PiChart {
  constructor() { }
  options: Object;

  getPieChartData() {
    return {
      title: {
        text: 'Student'
      },
      xAxis: {
        tickInterval: 1
      },
      yAxis: {
        type: 'logarithmic',
        minorTickInterval: 0.1
      },
      credits: {
        enabled: false
      },
      tooltip: {
        enabled: true
      },
      series: [{
        data: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512],
        pointStart: 1
      }]
    };


  }
}
