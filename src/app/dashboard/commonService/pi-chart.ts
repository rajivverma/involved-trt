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
      series: [
        {
          data: [50, 80, 90, 100, 110, 120, 150, 300, 700, 800],
          pointStart: 1,
          color: '#ffa500'
        },
        {
          data: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512],
          pointStart: 1,
          color: '#63d2e9',
          marker: {
            enabled: false
          },
          enableMouseTracking : false
        }]
    };


  }
}
