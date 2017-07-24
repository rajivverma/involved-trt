import { NgModule, Injectable } from '@angular/core';

@Injectable()
export class PiChart {
  constructor() { }
  options: Object;

  getPieChartData(GradeSet: any, xAxixData: any) {
    console.log(GradeSet);
    let count = -1;
    return {
      chart: {
        width: 1000
      },
      title: {
        text: 'Student'
      },
      xAxis: {
        categories: xAxixData
      },
      yAxis: {
        endOnTick: true,
        min: 0,
        max: 5,
        title: { text: 'Grade' },
        labels: {
          formatter: function () {
            return GradeSet[this.value];
          }
        }
      },
      credits: {
        enabled: false
      },
      series: [
        {
          data: [5, 2, 1, 4],
          color: '#ffa500'
        },
        {
          data: [5, 2, 1, 4],
          color: '#63d2e9',
          marker: {
            enabled: false
          },
          enableMouseTracking: false
        }]
    };


  }
}
